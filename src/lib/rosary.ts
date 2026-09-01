import { supabase } from "./supabase";

export const MYSTERY_GROUPS = [
    "Radosne",
    "Światła",
    "Bolesne",
    "Chwalebne"
] as const;

export const MYSTERIES = [
    // Radosne (0-4)
    "Zwiastowanie NMP",
    "Nawiedzenie św. Elżbiety",
    "Narodzenie Pana Jezusa",
    "Ofiarowanie Pana Jezusa w Świątyni",
    "Odnalezienie Pana Jezusa w Świątyni",
    // Światła (5-9)
    "Chrzest Pana Jezusa w Jordanie",
    "Objawienie się na weselu w Kanie",
    "Głoszenie Królestwa Bożego i wzywanie do nawrócenia",
    "Przemienienie na górze Tabor",
    "Ustanowienie Eucharystii",
    // Bolesne (10-14)
    "Modlitwa Pana Jezusa w Ogrójcu",
    "Biczowanie",
    "Cierniem ukoronowanie",
    "Dźwiganie krzyża",
    "Ukrzyżowanie i śmierć Pana Jezusa",
    // Chwalebne (15-19)
    "Zmartwychwstanie",
    "Wniebowstąpienie",
    "Zesłanie Ducha Świętego",
    "Wniebowzięcie NMP",
    "Ukoronowanie NMP na Królową Nieba i Ziemi"
];

/**
 * Oblicza aktualny tydzień różańca od daty startu.
 * Przedział: Tygodnie 1 do 20.
 */
export function getCurrentWeek(startDateString: string, currentDate: Date = new Date()): number {
    const startDate = new Date(startDateString);
    startDate.setHours(0, 0, 0, 0);

    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);

    const diffTime = current.getTime() - startDate.getTime();

    if (diffTime < 0) {
        return 1;
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(diffDays / 7) + 1;

    return Math.min(weekNumber, 20);
}

/**
 * Sprawdza, czy intencja powinna być zakończona (minęło 20 tygodni od daty startu).
 */
export function isIntentionCompleted(startDateString: string, currentDate: Date = new Date()): boolean {
    const startDate = new Date(startDateString);
    startDate.setHours(0, 0, 0, 0);

    const current = new Date(currentDate);
    current.setHours(0, 0, 0, 0);

    const diffTime = current.getTime() - startDate.getTime();
    if (diffTime < 0) return false;

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 140; // 20 tygodni * 7 dni
}

/**
 * Automatycznie aktualizuje w bazie danych i w pamięci intencje, które trwają ponad 20 tygodni.
 */
export async function syncIntentionStatus<T extends { id: string; start_date: string; status: string }>(
    intentions: T[]
): Promise<T[]> {
    const expiredIds: string[] = [];

    for (const intention of intentions) {
        if (intention.status === "active" && isIntentionCompleted(intention.start_date)) {
            intention.status = "completed";
            expiredIds.push(intention.id);
        }
    }

    if (expiredIds.length > 0) {
        await supabase
            .from("intentions")
            .update({ status: "completed" })
            .in("id", expiredIds);
    }

    return intentions;
}

/**
 * Zwraca id (0-19) tajemnicy przeznaczonej dla danego slotu w danym tygodniu.
 * @param slot - slot użytkownika (1 - 20)
 * @param weekNumber - numer aktualnego tygodnia (zaczynając od 1)
 */
export function getMysteryIndexForSlot(slot: number, weekNumber: number): number {
    // Ostatnia osoba w tygodniu pierwszym (slot 20) ma index tajemnicy 19.
    // Jeśli tydzień leci w przód, każda osoba idzie o tajemnicę do przodu, więc index tajemnicy się powiększa o 1
    return (slot - 1 + weekNumber - 1) % 20;
}

/**
 * Pobiera obiekt informacyjny o przypisanej tajemnicy.
 */
export function getMysteryForSlot(slot: number, weekNumber: number) {
    const mysteryIndex = getMysteryIndexForSlot(slot, weekNumber);
    const groupIndex = Math.floor(mysteryIndex / 5);

    return {
        index: mysteryIndex,
        name: MYSTERIES[mysteryIndex],
        groupName: MYSTERY_GROUPS[groupIndex],
        weekNumber,
    };
}
