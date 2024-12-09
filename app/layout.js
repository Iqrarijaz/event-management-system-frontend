"use client";
import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";



const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3B82F6",
              borderRadius: 5,
              colorBgContainer: "#ffffff", //a6b5ad
              fontFamily: "Poppins, sans-serif",
              fontSize: 16,
              colorText: "#404040",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastContainer />
            {children}
          </QueryClientProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
