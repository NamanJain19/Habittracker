import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import DashboardPage from '@/components/pages/DashboardPage';
import HabitsPage from '@/components/pages/HabitsPage';
import GoalsPage from '@/components/pages/GoalsPage';
import ProductivityPage from '@/components/pages/ProductivityPage';
import FitnessPage from '@/components/pages/FitnessPage';
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
import SmartFitnessPage from '@/components/pages/SmartFitnessPage';
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
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'dashboard',
        },
      },
      {
        path: "habits",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to track your habits">
            <HabitsPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'habits',
        },
      },
      {
        path: "goals",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to manage your goals">
            <GoalsPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'goals',
        },
      },
      {
        path: "productivity",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to track your productivity">
            <ProductivityPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'productivity',
        },
      },
      {
        path: "fitness",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to track your fitness">
            <FitnessPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'fitness',
        },
      },
      {
        path: "wellness",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to track your wellness">
            <WellnessPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'wellness',
        },
      },
      {
        path: "community",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to join the community">
            <CommunityPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'community',
        },
      },
      {
        path: "reminders",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to manage your reminders">
            <RemindersPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'reminders',
        },
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'profile',
        },
      },
      {
        path: "settings",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to manage your settings">
            <SettingsPage />
          </MemberProtectedRoute>
        ),
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
        path: "tracker/smart-fitness",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access Smart Fitness & Body Analysis">
            <SmartFitnessPage />
          </MemberProtectedRoute>
        ),
        routeMetadata: {
          pageIdentifier: 'smart-fitness',
        },
      },
      {
        path: "tracker/smartwatch",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access Smartwatch Integration">
            <SmartwatchPage />
          </MemberProtectedRoute>
        ),
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
