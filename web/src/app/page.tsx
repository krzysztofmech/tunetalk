import { Button } from "@/components/Button";
import { FaCircleInfo, FaAddressBook } from "react-icons/fa6";
export default async function Home() {
  return (
    <>
      <main className="flex w-full h-screen justify-center items-center">
        <h1 className="text-8xl font-bold text-pink-500">tunetalk</h1>
        <Button
          href="/api/auth/signin?callbackUrl=/dashboard"
          text="Join Us"
          variant="filled"
        />
      </main>
      <section className="flex w-full h-screen justify-center items-center">
        <div className="w-1/2 flex justify-center flex-col">
          <h2 className="text-4xl font-bold text-pink-500 flex">
            <FaCircleInfo className="mr-2" /> About
          </h2>
          <h3 className="text-2xl font-bold text-pink-500 pt-8">tunetalk</h3>
          <p className="text-lg text-pink-500 font-bold pt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione qui
            nulla iusto at dolore fuga animi dolorum! Consequatur, iusto. Enim
            minima atque ipsa voluptates possimus labore accusantium doloribus
            natus harum.
          </p>
          <h3 className="text-2xl font-bold text-pink-500 pt-8">Author</h3>
          <p className="text-lg text-pink-500 font-bold pt-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione qui
            nulla iusto at dolore fuga animi dolorum! Consequatur, iusto. Enim
            minima atque ipsa voluptates possimus labore accusantium doloribus
            natus harum.
          </p>
          <h2 className="text-4xl font-bold text-pink-500 pt-8 flex">
            <FaAddressBook className="mr-2" /> Contact
          </h2>
          <p className="text-lg text-pink-500 font-bold pt-8">
            To get a source code of Tunetalk you can check my{" "}
            <a href="https://github.com/krzysztofmech">Github</a>.
            <br />
            You can hit me up on my{" "}
            <a href="https://www.linkedin.com/in/krzysztof-mech/">
              LinkedIn
            </a>{" "}
            account or krzysztofmech7@gmail.com.
          </p>
        </div>
      </section>
    </>
  );
}
