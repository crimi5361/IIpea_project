import AppRoutes from "../AppRoutes/AppRoutes";

 interface PageContentsProps  {
  isSidemenuOpen: boolean;
 }


 const PageContent: React.FC<PageContentsProps> = ({ isSidemenuOpen }) => {
  return (
    <div
      className={`p-4 pt-20 bg-gray-50 dark:bg-gray-900 min-h-screen transition-all duration-300
      ${isSidemenuOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-20 w-[calc(100%-5rem)]"}`}
    >
      <AppRoutes />
    </div>
  );
};

export default PageContent;

