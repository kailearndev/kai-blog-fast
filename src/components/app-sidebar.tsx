import * as React from "react";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { VersionSwitcher } from "@/components/version-switcher";
import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { Feather, TagIcon } from "lucide-react";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  versions: ["1.0.0"],
  navMain: [
    {
      title: "Management",

      items: [
        {
          title: "Post",
          url: "/post",

          icon: <Feather className={clsx("h-4 w-4")} />,
        },
        {
          title: "Tag",
          url: "/tag",

          icon: <TagIcon className={clsx("h-4 w-4")} />,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        activeProps={{
                          className:
                            "bg-gray-500 font-bold text-white duration-200 ",
                        }}
                        className="flex items-center p-2 rounded justify-between "
                        to={item.url}
                      >
                        {item.title} {item.icon}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
