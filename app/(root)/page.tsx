import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
    return (
        <div className="p-4">
            <UserButton afterSignOutUrl="/sign-in" />
        </div>
    );
  }

export default SetupPage;
  