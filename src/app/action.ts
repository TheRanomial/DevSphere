"use server"

import { deleteUser } from "@/data-access/User";
import { getSession } from "@/lib/auth"

export async function deleteAccountAction(){
    const session=await getSession();

    if(!session){
        throw new Error("User is not logged in");
    }

    await deleteUser(session.user.id);

}