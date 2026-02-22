Aplikacja do grupowego odmawiania Różańca w intencji
Kontekst dziedzinowy
Różaniec składa się z 20 tajemnic podzielonych na 4 grupy po 5:

Radosne, Światła , Bolesne , Chwalebne

Algorytm przydziału tajemnic

Litania trwa 20 tygodni — tyle ile tajemnic.
Każda z 20 osób otrzymuje inną tajemnicę na start (osoba 1 → tajemnica 1, osoba 2 → tajemnica 2, … osoba 20 → tajemnica 20).
Co tydzień każda osoba przesuwa się o jedną tajemnicę do przodu (cyklicznie, bo jest dokładnie 20 osób i 20 tajemnic — po 20 tygodniach każda osoba odmówiła każdą tajemnicę).
Zmiana tygodnia następuje z soboty na niedzielę o północy (00:00 w strefie czasowej lokalnej serwera).
Tydzień nr 1 zaczyna się w dniu startDate podanym przy tworzeniu intencji.

Encje danych
Intention (Intencja)

id — unikalny identyfikator
title — treść intencji (tekst)
startDate — data rozpoczęcia litanii
status — active | finished

Participant (Uczestnik)

id
intentionId
firstName, lastName
email — opcjonalne
slot — numer od 1 do 20 (przydzielany automatycznie przy dołączeniu, kolejno wolny slot)


Obliczanie aktualnej tajemnicy uczestnika
Po zakonczeniu tygodnia uczestnik dostaje kolejną tajemnice do odmówinia. Przykład :
W pierwszym tygodniu osoba 1 ma pierwsza tajemnice radosną, to druga osoba w kolejności w pierwszym tygodniu ma drugą tajemnice radosną. 
W ten sposob kazda z 20 osob odmawia jedna tajemnice tygodniowo. Żadna z osób w danym tygodniu nie odmawia tej samej tajemnicy.
Ostatnia osoba ma 5 tajemnice chwalebna. W kolejnym tygodniu ma pierwsza tajemnice radosna. itd. 
Widoki aplikacji
1. Strona główna — Lista intencji

Wyświetla wszystkie intencje
Przycisk "Utwórz nową intencję".
Dołącz do intencji.

2. Formularz tworzenia intencji

Pola: treść intencji (textarea), data startu (date picker, wymagana niedziela).

3. Onboarding uczestnika

Gdy uzytkownik kliknie w daną intecję to wtedy moze wpisac swoje imie i nazwisko oraz mail (opcjonalnie ) i kliknac dołacz. Gdy dołaczy jest mu przydzielany slot (1-20) i jedna z tajemnic rózanca na pierwszy tydzien. 

4. Widok przestrzeni intencji

Widoczny po dołączeniu.

Tabela/lista wszystkich uczestników: imię i nazwisko | tajemnica w tym tygodniu 
Tajemnice pogrupowane wizualnie (Radosne / Światła / Bolesne / Chwalebne). Kazdy moze zobaczyc liste wszystkich uczestnikow i tajemnic. 

Dodatkowe założenia techniczne

Brak wymaganej rejestracji. Dostep do kazdej intencji przez klikniecie w link. 
Dane przechowywane w prostej bazie w supabase. 
Backend: REST API lub prosta aplikacja fullstack/ 
Responsywny UI (mobile-first — większość użytkowników wejdzie z telefonu).
Język interfejsu: polski.