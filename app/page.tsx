import HomeContent from "../components/HomeContent";
import Stats from "../components/Stats";
import LatestWorkers from "../components/LatestWorkers";
import LatestJobs from "../components/LatestJobs";
export default function Home() {
  return (
    <>
      <HomeContent />

      <Stats />
 {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-2">
          WorkLinkHub
        </h2>

        <p className="mb-2">
          Connect Workers. Get Work Done.
        </p>

        <p>
          © 2026 WorkLinkHub. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}