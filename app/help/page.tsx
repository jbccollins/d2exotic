"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Link, Typography, useTheme } from "@mui/material";

type SectionHeaderProps = {
  href: string;
  title: string;
};

const SectionHeader = ({ href, title }: SectionHeaderProps) => {
  const theme = useTheme();
  const handleClick = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}#${href}`
    );
  };
  return (
    <Box sx={{ color: "white", display: "flex", alignItems: "center" }}>
      <Link
        href={`#${href}`}
        sx={{ color: "white", marginRight: theme.spacing(1) }}
      >
        <Typography variant="h4"># {title}</Typography>
      </Link>
      <IconButton aria-label="copy link" size="small" onClick={handleClick}>
        <ContentCopyIcon sx={{ color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default function Help() {
  const theme = useTheme();
  return (
    <Box sx={{ padding: theme.spacing(3) }}>
      <SectionHeader href="armor-stats" title="Armor Stats" />
    </Box>
  );
}
