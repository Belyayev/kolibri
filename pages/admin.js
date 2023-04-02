import { getSession } from "next-auth/client";

import UserProfile from "../components/adminPage/adminPage";

function AdminPage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AdminPage;
