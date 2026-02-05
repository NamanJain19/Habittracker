import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import HabitsPage from '@/components/pages/HabitsPage';
import GoalsPage from '@/components/pages/GoalsPage';
import ProductivityPage from '@/components/pages/ProductivityPage';
import SmartFitnessPage from '@/components/pages/SmartFitnessPage';
import WellnessPage from '@/components/pages/WellnessPage';
import CommunityPage from '@/components/pages/CommunityPage';
import RemindersPage from '@/components/pages/RemindersPage';
import ProfilePage from '@/components/pages/ProfilePage';
import SettingsPage from '@/components/pages/SettingsPage';
import AboutPage from '@/components/pages/AboutPage';
import SupportPage from '@/components/pages/SupportPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';
import ContactPage from '@/components/pages/ContactPage';
import SmartwatchPage from '@/components/pages/SmartwatchPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        routeMetadata: {
          pageIdentifier: 'dashboard',
        },
      },
      {
        path: "habits",
        element: <HabitsPage />,
        routeMetadata: {
          pageIdentifier: 'habits',
        },
      },
      {
        path: "goals",
        element: <GoalsPage />,
        routeMetadata: {
          pageIdentifier: 'goals',
        },
      },
      {
        path: "productivity",
        element: <ProductivityPage />,
        routeMetadata: {
          pageIdentifier: 'productivity',
        },
      },
      {
        path: "fitness",
        element: <SmartFitnessPage />,
        routeMetadata: {
          pageIdentifier: 'fitness',
        },
      },
      {
        path: "wellness",
        element: <WellnessPage />,
        routeMetadata: {
          pageIdentifier: 'wellness',
        },
      },
      {
        path: "community",
        element: <CommunityPage />,
        routeMetadata: {
          pageIdentifier: 'community',
        },
      },
      {
        path: "reminders",
        element: <RemindersPage />,
        routeMetadata: {
          pageIdentifier: 'reminders',
        },
      },
      {
        path: "profile",
        element: <ProfilePage />,
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
      {
        path: "settings",
        element: <SettingsPage />,
        routeMetadata: {
          pageIdentifier: 'settings',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "support",
        element: <SupportPage />,
        routeMetadata: {
          pageIdentifier: 'support',
        },
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "terms",
        element: <TermsPage />,
        routeMetadata: {
          pageIdentifier: 'terms',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "smartwatch",
        element: <SmartwatchPage />,
        routeMetadata: {
          pageIdentifier: 'smartwatch',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
