import { AppLayout } from "@/components/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="mt-2 max-w-md text-sm text-gray-600 dark:text-gray-400">
        This is a placeholder dashboard. Real pages and routing are added in
        the next parts.
      </p>
    </AppLayout>
  );
}

export default App;
