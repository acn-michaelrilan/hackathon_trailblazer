// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// export async function createClient() {
//   const cookieStore = cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         async getAll() {
//           return (await cookieStore).getAll();
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(async ({ name, value, options }) =>
//               (await cookieStore).set(name, value, options)
//             );
//           } catch {}
//         },
//       },
//     }
//   );
// }

// export async function getUserSession() {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getSession();
//   return data.session?.user ?? null;
// }

"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  // 🔹 FIX: Add 'await' here because cookies() is now async
  const cookieStore = await cookies(); 

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore if called in a context where cookies can't be set
          }
        },
      },
    }
  );
}

export async function getUserSession() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}
