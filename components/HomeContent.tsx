"use client";
import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
export default function Home() {
  const router = useRouter();

  const [profession, setProfession] = useState("");
  const [location, setLocation] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const { language } = useLanguage();
  const { t } = useLanguage();
  const categories = [
    "Construction",
    "Tiles Workers",
    "Plumbers",
    "Electricians",
    "Painters",
    "Carpenters",
    "Drivers",
    "Agriculture",
    "Factory Workers",
    "Event Workers",
    "Mechanics",
    "AC Technicians",
    "House Keeping",
    "Security Guards",
    "Welders",
    "Beauty Services",
  ];
useEffect(() => {
  fetch("/api/notify-visit", {
    method: "POST",
  });
}, []);
const [user, setUser] = useState<any>(null);

useEffect(() => {
  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  loadUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);

async function handleLogout() {
  await supabase.auth.signOut();
  window.location.href = "/";
}
  return (
    <main className="min-h-screen bg-white text-gray-900">
    {/* Hero */}
      <section className="bg-orange-500 text-white py-24">
        <div className="max-w-6xl mx-auto text-center px-6">

        <h1 className="text-6xl font-bold mb-6">
          WorkLinkHub
        </h1>

        <p className="text-2xl mb-4">
          Connect Workers. Get Work Done.
        </p>

        <p className="text-lg mb-12">
          Find trusted local workers or get hired instantly.
        </p>

        <div className="flex flex-wrap justify-center gap-6">

  <a
    href="/workers"
  className="bg-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg"
  style={{ color: "#ea580c" }}
  >
    🔍 Find Workers
  </a>

  <a
    href="/register-worker"
    className="bg-white text-blue-600 border border-blue-200 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-50 hover:scale-105 transition"
    style={{ color: "#2563eb" }}
  >
    👷 Join as Worker
  </a>

  <a
    href="/post-job"
    className="bg-white text-green-600 border border-green-200 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-50 hover:scale-105 transition"
    style={{ color: "#16a34a" }}
  >
    📢 Post a Job
  </a>

</div>

        </div>  
      </section>

      {/* Search */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Search Workers
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg text-gray-900"
            >
              <option value="">Select Profession</option>
              <option value="Electrician">Electrician</option>
              <option value="Plumber">Plumber</option>
              <option value="Tile Worker">Tile Worker</option>
              <option value="Painter">Painter</option>
              <option value="Driver">Driver</option>
              <option value="Mechanic">Mechanic</option>
              <option value="Carpenter">Carpenter</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg text-gray-900"
            />

            <button
              onClick={() =>
                router.push(
                  `/workers?profession=${profession}&location=${location}`
                )
              }
              className="bg-orange-500 text-white rounded-lg"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {categories.map((item) => (
              <div
                key={item}
                className="border border-gray-200 bg-white rounded-xl p-6 text-center text-gray-900 hover:shadow-xl transition"
              >
                <h3 className="font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">
            Why Choose WorkLinkHub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow text-gray-900">
              <h3 className="font-bold text-xl mb-3">
                Trusted Workers
              </h3>

              <p>
                Find genuine local workers for your daily work needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-gray-900">
              <h3 className="font-bold text-xl mb-3">
                Quick Hiring
              </h3>

              <p>
                Contact workers directly and get work started immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-gray-900">
              <h3 className="font-bold text-xl mb-3">
                More Job Opportunities
              </h3>

              <p>
                Workers can receive more work requests from nearby customers.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
      How WorkLinkHub Works
    </h2>

    <p className="text-center text-gray-600 mb-14">
      Simple, fast and trusted for both workers and customers.
    </p>

    <div className="grid md:grid-cols-2 gap-12">

      {/* Customer */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow">

        <h3 className="text-2xl font-bold text-orange-500 mb-6">
          🏠 For Customers
        </h3>

        <div className="space-y-6">

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              1
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Search Workers
              </h4>

              <p className="text-gray-600">
                Search workers by profession and location.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              2
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                View Worker Profile
              </h4>

              <p className="text-gray-600">
                Check experience, profile, and contact details.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              3
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Call or WhatsApp
              </h4>

              <p className="text-gray-600">
                Contact workers instantly and get your work done.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Worker */}
      <div className="bg-gray-50 rounded-2xl p-8 shadow">

        <h3 className="text-2xl font-bold text-green-600 mb-6">
          👷 For Workers
        </h3>

        <div className="space-y-6">

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              1
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Register
              </h4>

              <p className="text-gray-600">
                Create your worker profile for free.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              2
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Get Approved
              </h4>

              <p className="text-gray-600">
                Our admin reviews and verifies your profile.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              3
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Receive Work
              </h4>

              <p className="text-gray-600">
                Customers contact you directly through phone or WhatsApp.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>
{/* Platform Highlights */}
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
      Why Thousands Choose WorkLinkHub
    </h2>

    <p className="text-center text-gray-600 mb-14">
      Everything you need to connect workers and customers in one trusted platform.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2">Verified Workers</h3>
        <p className="text-gray-600">
          Every worker is reviewed by our admin before becoming visible.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">📞</div>
        <h3 className="text-xl font-bold mb-2">Direct Contact</h3>
        <p className="text-gray-600">
          Call or WhatsApp workers directly without any middleman.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">⚡</div>
        <h3 className="text-xl font-bold mb-2">Fast Hiring</h3>
        <p className="text-gray-600">
          Find workers within minutes for urgent jobs.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">💰</div>
        <h3 className="text-xl font-bold mb-2">Free Registration</h3>
        <p className="text-gray-600">
          Workers can create their profile absolutely free.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">📍</div>
        <h3 className="text-xl font-bold mb-2">Nearby Workers</h3>
        <p className="text-gray-600">
          Search workers based on your city and location.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition">
        <div className="text-5xl mb-4">🔒</div>
        <h3 className="text-xl font-bold mb-2">Trusted Platform</h3>
        <p className="text-gray-600">
          Safe, secure and built for workers and customers.
        </p>
      </div>

    </div>

  </div>
</section>
{/* About WorkLinkHub */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid md:grid-cols-2 gap-12 items-center">

      {/* Left Side */}
      <div>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
          About WorkLinkHub
        </h2>

        <p className="text-lg text-gray-600 leading-8 mb-6">
          WorkLinkHub is a platform that connects skilled workers with customers
          looking for trusted services. Whether you need an electrician,
          plumber, carpenter, driver, painter, or any local professional,
          WorkLinkHub helps you find the right worker quickly and easily.
        </p>

        <p className="text-lg text-gray-600 leading-8">
          Our mission is to create more job opportunities for workers while
          making it simple for customers to hire reliable professionals in
          their local area.
        </p>
      </div>

      {/* Right Side */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-orange-50 p-6 rounded-2xl text-center shadow">
          <div className="text-5xl mb-3">🎯</div>
          <h3 className="font-bold text-xl">Our Mission</h3>
          <p className="text-gray-600 mt-2">
            Connect every worker with more opportunities.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-2xl text-center shadow">
          <div className="text-5xl mb-3">🌍</div>
          <h3 className="font-bold text-xl">Our Vision</h3>
          <p className="text-gray-600 mt-2">
            Become India's trusted worker marketplace.
          </p>
        </div>

        <div className="bg-blue-50 p-6 rounded-2xl text-center shadow">
          <div className="text-5xl mb-3">🤝</div>
          <h3 className="font-bold text-xl">Trust</h3>
          <p className="text-gray-600 mt-2">
            Verified workers and genuine customers.
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-2xl text-center shadow">
          <div className="text-5xl mb-3">⚡</div>
          <h3 className="font-bold text-xl">Fast Hiring</h3>
          <p className="text-gray-600 mt-2">
            Find or hire workers within minutes.
          </p>
        </div>

      </div>

    </div>

  </div>
</section>
{/* Contact Section */}
<section className="py-20 bg-gray-100">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-4">
      Contact Us
    </h2>

    <p className="text-center text-gray-600 mb-12">
      Have questions? We're here to help.
    </p>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">📧</div>
        <h3 className="font-bold text-xl mb-2">
          Email
        </h3>

        <p className="text-gray-600">
          support@worklinkhub.in
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">📱</div>
        <h3 className="font-bold text-xl mb-2">
          WhatsApp
        </h3>

        <p className="text-gray-600">
          +91 XXXXX XXXXX
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-5xl mb-4">📍</div>
        <h3 className="font-bold text-xl mb-2">
          Location
        </h3>

        <p className="text-gray-600">
          Hyderabad, India
        </p>
      </div>

    </div>

  </div>
</section>
{/* FAQ */}
<section className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center mb-12">
      Frequently Asked Questions
    </h2>

    <div className="space-y-6">

      <div className="bg-gray-50 rounded-xl p-6 shadow">
        <h3 className="font-bold text-lg">
          Is WorkLinkHub free?
        </h3>
        <p className="text-gray-600 mt-2">
          Yes. Registering as a worker and searching for workers are completely free.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow">
        <h3 className="font-bold text-lg">
          How are workers verified?
        </h3>
        <p className="text-gray-600 mt-2">
          Every worker profile is reviewed and approved by the admin before it becomes visible.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow">
        <h3 className="font-bold text-lg">
          How do I contact a worker?
        </h3>
        <p className="text-gray-600 mt-2">
          You can call or message the worker directly using the contact details on their profile.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 shadow">
        <h3 className="font-bold text-lg">
          Can I post more than one job?
        </h3>
        <p className="text-gray-600 mt-2">
          Yes. There is no limit to the number of jobs you can post.
        </p>
      </div>

    </div>

  </div>
</section>
{/* Testimonials */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
      What Our Users Say
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-gray-50 p-6 rounded-xl shadow">
        <p className="text-gray-700">
          Found a plumber within 30 minutes. Very useful platform.
        </p>

        <h4 className="font-bold mt-4 text-orange-500">
          Rahul
        </h4>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow">
        <p className="text-gray-700">
          Got multiple job opportunities after registering on WorkLinkHub.
        </p>

        <h4 className="font-bold mt-4 text-orange-500">
          Suresh
        </h4>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl shadow">
        <p className="text-gray-700">
          Easy way to connect with workers and customers nearby.
        </p>

        <h4 className="font-bold mt-4 text-orange-500">
          Priya
        </h4>
      </div>

    </div>
  </div>
</section>

    </main>
  );
}