import { createStyles } from "@mantine/core";
import type { Icon } from "@tabler/icons-react";
import {
  IconAlbum as Album,
  IconBookmark as Bookmark,
  IconChartBar as ChartBar,
  IconChartLine as ChartLine,
  IconCloud as Cloud,
  IconDownload as Download,
  IconFaceId as FaceId,
  IconMap as Map,
  IconMoodSmile as MoodSmile,
  IconPhoto as Photo,
  IconShare as Share,
  IconTags as Tags,
  IconTrash as Trash,
  IconUpload as Upload,
  IconUsers as Users,
  IconVectorTriangle as VectorTriangle,
  IconWand as Wand,
  IconWorld as World,
} from "@tabler/icons-react";

type SubmenuItem = {
  label: string;
  link: string;
  icon: any;
  header: string;
  separator: boolean;
  disabled: boolean;
  color: string;
};

type MenuItem = {
  label: string;
  link: string;
  icon: Icon;
  color: string;
  display?: boolean;
  submenu?: Array<Partial<SubmenuItem>>;
};

export function getNavigationItems(
  t: (s: string) => string,
  isAuthenticated: boolean,
  canAccess: boolean
): Array<MenuItem> {
  return [
    { label: t("sidemenu.photos"), link: "/", icon: Photo, color: "green" },
    {
      label: t("sidemenu.albums"),
      link: "/people",
      icon: Album,
      color: "blue",
      submenu: [
        { header: t("sidemenu.albums") },
        { label: t("sidemenu.people"), link: "/people", icon: Users },
        { label: t("sidemenu.places"), link: "/places", icon: Map },
        { label: t("sidemenu.things"), link: "/things", icon: Tags },
        { separator: true },
        { label: t("sidemenu.myalbums"), link: "/useralbums", icon: Bookmark },
        { label: t("sidemenu.autoalbums"), link: "/events", icon: Wand },
      ],
    },
    {
      label: t("sidemenu.datavizsmall"),
      link: "/placetree",
      icon: ChartLine,
      color: "yellow",
      submenu: [
        { header: t("sidemenu.dataviz") },
        { label: t("sidemenu.placetree"), link: "/placetree", icon: VectorTriangle },
        { label: t("sidemenu.wordclouds"), link: "/wordclouds", icon: Cloud },
        { label: t("sidemenu.timeline"), link: "/timeline", icon: ChartBar },
        { label: t("sidemenu.socialgraph"), link: "/socialgraph", icon: Share },
        { label: t("sidemenu.facecluster"), link: "/facescatter", icon: MoodSmile },
      ],
    },
    { label: t("sidemenu.facerecognition"), link: "/faces", icon: FaceId, color: "orange" },
    { label: t("photos.deleted"), link: "/deleted", icon: Trash, color: "red" },
  ];
}

export const navigationStyles = createStyles(theme => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]}`,
  },

  submenu: {
    display: "block",
  },

  text: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
  },

  hover: {
    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  linkIcon: {
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
          : theme.colors[theme.primaryColor][0],
    },
  },
}));
