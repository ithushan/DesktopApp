"use client";
import "./app.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
} from "@mui/material";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
// import './styles';
// import { uselocation } from";

const drawerWidth = 240;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const router = useRouter();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(date);
  };

  return (
    <html lang="en">
      <body
        style={{
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "100%",
                height: "100vh",
              }}
            >
              <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: 2 }} p={1}>
                  My App
                </Typography>

                {/* list / links part */}
                <List>
                  {menuItems.map((item, index) => (
                    <ListItem
                      key={index}
                      button
                      onClick={() => router.push(item.path)}
                      sx={{
                        background: pathName === item.path ? "#f9f9f9" : null,
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  backgroundColor: "#f9f9f9",
                  width: `calc(100% - ${drawerWidth}px)`,
                  height:"100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Box>
                  <AppBar position="relative" elevation={0}>
                    <Toolbar>
                      <Typography sx={{ flexGrow: 1 }}>
                        Today is the {moment().format("do (ddd) MMMM YYYY")}
                      </Typography>
                      <Typography>Your Name</Typography>
                      <Avatar src="/spider.png" sx={{marginLeft:2}} />
                    </Toolbar>
                  </AppBar>
                </Box>
                <Box>{children}</Box>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
