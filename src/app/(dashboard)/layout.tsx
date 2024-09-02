import SideNav from "@/components/sidenav";

export default function Layout(
    { children }: 
    Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-full">
            <SideNav />
            <div className=" w-full">{children}</div>
        </div>
    );
}