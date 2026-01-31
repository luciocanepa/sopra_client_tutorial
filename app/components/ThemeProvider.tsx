"use client";

import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  const lightTheme = {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: "#4f7cac",
      borderRadius: 12,
      colorText: "#1a1a2e",
      fontSize: 15,
      colorBgContainer: "#ffffff",
      colorBgLayout: "#f5f7fa",
      colorBorder: "#e2e8f0",
      colorBorderSecondary: "#edf2f7",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      boxShadowSecondary:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    components: {
      Button: {
        colorPrimary: "#5a9a7f",
        borderRadius: 10,
        controlHeight: 40,
        paddingContentHorizontal: 20,
        fontWeight: 500,
      },
      Input: {
        borderRadius: 10,
        colorBorder: "#e2e8f0",
        colorTextPlaceholder: "#a0aec0",
        controlHeight: 42,
        paddingInline: 14,
      },
      Form: {
        labelColor: "#2d3748",
        verticalLabelPadding: "0 0 8px",
      },
      Card: {
        borderRadiusLG: 16,
        paddingLG: 24,
        boxShadowTertiary:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      Modal: {
        borderRadiusLG: 16,
      },
      Select: {
        borderRadius: 10,
        controlHeight: 42,
      },
      Table: {
        borderRadius: 12,
        headerBg: "#f7fafc",
      },
      Menu: {
        borderRadius: 10,
        itemBorderRadius: 8,
      },
      Notification: {
        borderRadiusLG: 12,
      },
      Message: {
        borderRadiusLG: 12,
      },
    },
  };

  const darkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: "#5a9a7f",
      borderRadius: 12,
      colorText: "#e2e8f0",
      fontSize: 15,
      colorBgContainer: "#1e2028",
      colorBgLayout: "#13151a",
      colorBorder: "#2d3748",
      colorBorderSecondary: "#3a4556",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      boxShadowSecondary:
        "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    },
    components: {
      Button: {
        colorPrimary: "#5a9a7f",
        borderRadius: 10,
        controlHeight: 40,
        paddingContentHorizontal: 20,
        fontWeight: 500,
      },
      Input: {
        borderRadius: 10,
        colorBorder: "#3a4556",
        colorTextPlaceholder: "#718096",
        controlHeight: 42,
        paddingInline: 14,
        colorBgContainer: "#252830",
      },
      Form: {
        labelColor: "#e2e8f0",
        verticalLabelPadding: "0 0 8px",
      },
      Card: {
        borderRadiusLG: 16,
        paddingLG: 24,
        colorBgContainer: "#1e2028",
        boxShadowTertiary:
          "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
      },
      Modal: {
        borderRadiusLG: 16,
        colorBgElevated: "#1e2028",
      },
      Select: {
        borderRadius: 10,
        controlHeight: 42,
        colorBgContainer: "#252830",
      },
      Table: {
        borderRadius: 12,
        headerBg: "#252830",
        colorBgContainer: "#1e2028",
      },
      Menu: {
        borderRadius: 10,
        itemBorderRadius: 8,
        colorBgContainer: "#1e2028",
      },
      Notification: {
        borderRadiusLG: 12,
        colorBgElevated: "#1e2028",
      },
      Message: {
        borderRadiusLG: 12,
        colorBgElevated: "#1e2028",
      },
    },
  };

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
}
