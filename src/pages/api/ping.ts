import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { syncIntentionStatus } from "../../lib/rosary";

export const prerender = false;

export const GET: APIRoute = async () => {
    try {
        // Query Supabase to keep connection active and wake up DB if needed
        const { data: intentions, error } = await supabase
            .from("intentions")
            .select("id, start_date, status")
            .limit(50);

        if (error) {
            return new Response(
                JSON.stringify({ status: "error", message: error.message }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        // Run sync on fetched intentions to complete any expired intentions during background ping
        if (intentions && intentions.length > 0) {
            await syncIntentionStatus(intentions);
        }

        return new Response(
            JSON.stringify({
                status: "ok",
                message: "Supabase keep-alive ping successful",
                timestamp: new Date().toISOString(),
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (err: any) {
        return new Response(
            JSON.stringify({ status: "error", message: err?.message || String(err) }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
