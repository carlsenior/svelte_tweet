import { error } from "@sveltejs/kit"


export async function load({params, fetch}) {
    const res = await fetch(`/home/profile/${params.user}`)
    if (res.ok) {
        return await res.json()
    }
    throw error(500)
}