import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Bills IO",
  };
};

export default function Index() {
  return (
    <div>
      <main>
        <h1 className="text-red-500">Bills IO</h1>
      </main>
    </div>
  );
}
