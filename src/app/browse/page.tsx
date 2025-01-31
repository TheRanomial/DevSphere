import { Button } from "@/components/ui/button";
import Link from "next/link";
import SearchBar from "./search-bar";
import { getRooms } from "@/data-access/Room";
import Roomcard from "./roomcard";
import Image from "next/image";



interface Params {
  search: string;
}

export default async function Page({ searchParams }: { searchParams: Params }) {
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {rooms.map((room, i) => {
          return <Roomcard key={i} room={room}></Roomcard>;
        })}
      </div>

      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/no-data.svg"
            width="200"
            height="200"
            alt="no data image"
          />

          <h2 className="text-2xl">No Rooms Yet!</h2>

          <Button asChild>
            <Link href="/create-room">Create Room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
