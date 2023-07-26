"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Box,
  BoxProps,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemProps,
  ListProps,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useScrollToById } from "../hooks/hooks";

const contactDiscordUrl =
  "https://discord.com/channels/1075179873284411462/1122701973116964905";

const Emphasis = styled(Box)(({ theme }) => ({
  color: "#52bae3",
  display: "inline",
}));

const SectionBody = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
}));

const CustomLink = styled(Link, {
  shouldForwardProp: (prop) => !["large"].includes(prop as string),
})<{ large?: boolean }>(({ large }) => ({
  color: "white",
  textDecorationColor: "white",
  textUnderlineOffset: "4px",
  // textDecoration: "none",
  // borderBottom: large ? "3px solid white" : "1px solid white",
}));

const CustomList = function CustomList(props: ListProps) {
  return <List dense {...props} sx={{ listStyleType: "disc", pl: 4 }} />;
};

const CustomListItem = function CustomListItem(props: ListItemProps) {
  return <ListItem {...props} sx={{ display: "list-item" }} />;
};

type SectionHeaderProps = {
  href: string;
  title: string;
  onCopy: () => void;
  fontSize?: string;
  sx?: BoxProps["sx"];
};

const SectionHeader = ({
  href,
  title,
  onCopy,
  sx,
  fontSize,
}: SectionHeaderProps) => {
  const scrollToAnchor = useScrollToById(64);
  const makeActive = (linkId: string) => {
    scrollToAnchor(linkId);
  };
  const theme = useTheme();
  const handleClick = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}#${href}`
    );
    onCopy();
    makeActive(href);
  };
  return (
    <Box
      id={href}
      sx={{
        color: "white",
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
        ...sx,
      }}
    >
      <CustomLink
        large
        href={`#${href}`}
        sx={{
          color: "white",
          marginRight: theme.spacing(1),
          textDecoration: "none",
          borderBottom: fontSize ? "2px solid white" : "3px solid white",
        }}
        onClick={handleClick}
      >
        <Typography
          sx={{ fontSize: fontSize ? fontSize : "24px" }}
          variant="h5"
        >
          # {title}
        </Typography>
      </CustomLink>
      <IconButton aria-label="copy link" size="small" onClick={handleClick}>
        <ContentCopyIcon
          sx={{ color: "white", fontSize: fontSize ? fontSize : "24px" }}
        />
      </IconButton>
    </Box>
  );
};

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

export default function Help() {
  const theme = useTheme();
  const [toastOpen, setToastOpen] = useState(false);
  const [lastPage, setLastPage] = useState("/");
  const scrollToAnchor = useScrollToById(64);
  const makeActive = (linkId: string) => {
    scrollToAnchor(linkId);
  };

  const handleClose = () => {
    setToastOpen(false);
  };

  const handleOpen = () => {
    setToastOpen(true);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      makeActive(hash.replace("#", ""));
    }
    setLastPage(document.referrer);
  }, []);
  let href = "/";
  // Go back to the home page while keeping the query params
  if (
    typeof window !== "undefined" &&
    lastPage &&
    !lastPage.includes("help") &&
    lastPage.startsWith(window?.location.origin)
  ) {
    href = lastPage;
  }

  return (
    <Box
      id="help"
      sx={{
        padding: theme.spacing(3),
        marginTop: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      {/* <Box
        sx={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          top: 0,
          left: 0,
          background: "#121212",
          zIndex: 0,
        }}
      ></Box> */}
      <Box
        sx={{
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1px",
          paddingRight: "1px",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "fixed",
            top: "-0px",
            zIndex: 1,
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
          }}
        >
          <Link href={href}>
            <IconButton
              // onClick={() => {
              //   if (window.history.state && window.history.state.idx > 0) {
              //     router.push(lastPage);
              //   } else {
              //     router.push("/");
              //   }
              // }}
              aria-label="expand row"
              size="large"
              sx={{ color: "white", marginLeft: "-8px" }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Link>

          <Typography sx={{ marginLeft: theme.spacing(2) }} variant="h4">
            D2 Exotic Help
          </Typography>
        </Box>
        <SectionHeader
          sx={{ marginTop: 0 }}
          href="intro"
          title="Intro"
          onCopy={handleOpen}
        />
        <SectionBody>
          <Box>
            Legendary armor in Destiny 2 rolls with random stat values that are
            constrained by a few rules. Exotic armor rolls follow these rules,
            with a few exceptions. This document outlines the rules and
            exceptions that govern armor stat rolls.
          </Box>
        </SectionBody>
        <SectionHeader
          href="rules"
          title="Armor Roll Rules"
          onCopy={handleOpen}
        />
        <SectionBody>
          <Box>
            In order to understand the rules that govern armor stat rolls we
            must first understand the concept of{" "}
            <Emphasis>stat groups</Emphasis>. The six armor stats in Destiny 2
            are grouped in two buckets of three stats each:
            <CustomList dense>
              <CustomListItem>Mobility, Resilience and Recovery</CustomListItem>
              <CustomListItem>
                Discipline, Intellect and Strength
              </CustomListItem>
            </CustomList>
            We will refer to these stat groups as{" "}
            <Emphasis>Stat Group 1</Emphasis> and{" "}
            <Emphasis>Stat Group 2</Emphasis> moving forward.
            <Box>
              Given these <Emphasis>stat groups</Emphasis>, the rules that
              govern legendary armor stat rolls are as follows:
            </Box>
            <Box>
              <CustomList dense>
                <CustomListItem>
                  No single base stat value may be less than 2
                </CustomListItem>
                <CustomListItem>
                  No single base stat value may equal 3, 4 or 5
                </CustomListItem>
                <CustomListItem>
                  No single base stat value may be greater than 30
                </CustomListItem>
                <CustomListItem>
                  <Box>
                    The sum of the base stat values in each{" "}
                    <Emphasis> stat group </Emphasis> may be no less than 22 and
                    no greater than 34
                  </Box>
                </CustomListItem>
                <CustomListItem>
                  <Box>
                    While wearing an <Emphasis>armorer ghost mod</Emphasis>,
                    armor pieces with random stats you acquire will have a
                    guaranteed minimum of 10 in the stat that corresponds to the
                    equipped armorer ghost mod
                  </Box>
                </CustomListItem>
              </CustomList>
            </Box>
            <Box>
              To put that in plain English: any single stat can roll with any
              value between 2 and 30 except for 3, 4 or 5. The maximum total
              base stat value for any legendary armor piece is 68, where 34 stat
              points come from <Emphasis>Stat Group 1</Emphasis> and 34 stat
              points come from <Emphasis>Stat Group 2</Emphasis>. The minimum
              total base stat value for any legendary armor piece is 44, where
              22 stat points come from <Emphasis>Stat Group 1</Emphasis> and 22
              stat points come from <Emphasis>Stat Group 2</Emphasis>.
            </Box>
            <Box sx={{ marginTop: theme.spacing(1) }}>
              Additionally, <Emphasis>armorer ghost mods</Emphasis> (e.g.{" "}
              <CustomLink
                href="https://d2.destinygamewiki.com/wiki/Discipline_Armorer"
                target="_blank"
              >
                Discipline Armorer
              </CustomLink>
              ) can be used to force a minimum of 10 for any single stat of your
              choosing.
            </Box>
            <Box sx={{ marginTop: theme.spacing(1) }}>
              There are a few more rules that govern exactly how stat values are
              distributed. These rules involve triplets of numbers called{" "}
              <Emphasis>Stat Plugs</Emphasis>. This document will not go into
              detail about <Emphasis>Stat Plug</Emphasis> rules, but you can
              read more about such rules in{" "}
              <CustomLink
                target="_blank"
                href="https://www.reddit.com/r/DestinyTheGame/comments/mpaopq/how_armor_stats_roll_an_advanced_insight_into/"
              >
                this Reddit post
              </CustomLink>{" "}
              and explore <Emphasis>Stat Plug</Emphasis> values on{" "}
              <CustomLink target="_blank" href="https://plugs.mijago.net/">
                this website
              </CustomLink>{" "}
              if you are curious. For the vast majority of people, the five
              rules listed above are all that matter.
            </Box>
          </Box>
        </SectionBody>

        <SectionHeader
          href="exceptions"
          title="Exotic Exceptions"
          onCopy={handleOpen}
        />
        <SectionBody>
          <Box>
            Exotic armor rolls follow the same rules as legendary armor rolls
            with a few exceptions:
            <SectionHeader
              href="intrinsic-points-exception"
              title="Intrinsic Stat Points Exception"
              onCopy={handleOpen}
              fontSize="18px"
            />
            <Box>
              Some older exotics armor pieces always roll with up to +3 total
              additional <Emphasis>intrinsic stat points</Emphasis>. The
              allocation of these <Emphasis>intrinsic stat points</Emphasis> is
              always the same for any given exotic and the maximum{" "}
              <Emphasis>intrinsic stat points</Emphasis> that can be allocated
              to any single stat is +2. Such{" "}
              <Emphasis>intrinsic stat points</Emphasis> allow some exotic armor
              pieces to achieve minimum base stat values of 3 or 4 and maximum
              base stat values of 31 or 32, which are impossible for Legendary
              armor pieces to achieve. Such exotics can achieve higher base stat
              totals as a result, up to a maximum base stat total of 71. For
              example,{" "}
              <CustomLink
                target="_blank"
                href="/?s=Gwisin+Vest&group=DestinyClass&stats=true&filterStats=true"
              >
                Gwisin Vest
              </CustomLink>{" "}
              always rolls with <Emphasis>intrinsic stat points</Emphasis> of +2
              Mobility and +1 Resilience. A full list of exotic armor pieces
              with <Emphasis>intrinsic stat points</Emphasis> can be found{" "}
              <CustomLink
                target="_blank"
                href="/?group=DestinyClass&stats=true&filterStats=true"
              >
                here
              </CustomLink>
              .
            </Box>
            <SectionHeader
              href="intrinsic-focus-exception"
              title="Intrinsic Stat Focus Exception"
              onCopy={handleOpen}
              fontSize="18px"
            />
            <Box>
              Some exotic armor pieces have an{" "}
              <Emphasis>intrinsic stat focus</Emphasis> that can override a
              user's equipped <Emphasis>armorer ghost mod</Emphasis>. An exotic
              armor piece with an <Emphasis>intrinsic stat focus</Emphasis> is
              (almost always) guaranteed to roll with a minimum of 10 in the
              stat that corresponds to the{" "}
              <Emphasis>intrinsic stat focus</Emphasis>. More on that "almost
              always" clarification can be found in the{" "}
              <CustomLink href="#contraband">Contraband Exotics</CustomLink>{" "}
              section of this document. A full list of exotic armor pieces with
              an <Emphasis>intrinsic stat focus</Emphasis> can be found{" "}
              <CustomLink
                target="_blank"
                href="/?group=DestinyClass&focus=true&filterFocus=true"
              >
                here
              </CustomLink>
              .
            </Box>
            <Box sx={{ marginTop: theme.spacing(1) }}>
              While <Emphasis>intrinsic stat points</Emphasis> are quite
              straightforward, there are a few additional things to note about
              how <Emphasis>intrinsic stat focuses</Emphasis> work:
              <CustomList dense>
                <CustomListItem>
                  <Box>
                    If an exotic armor piece has an{" "}
                    <Emphasis>intrinsic stat focus</Emphasis> and you have an{" "}
                    <Emphasis>armorer ghost mod</Emphasis> equipped, the{" "}
                    <Emphasis>intrinsic stat focus</Emphasis> can override the{" "}
                    <Emphasis>armorer ghost mod</Emphasis> if, and only if, the
                    stats associated with the{" "}
                    <Emphasis>intrinsic stat focus</Emphasis> and the{" "}
                    <Emphasis>armorer ghost mod</Emphasis> are both in the same{" "}
                    <Emphasis>stat group</Emphasis>. For example,{" "}
                    <CustomLink
                      target="_blank"
                      href="/?s=Mask+of+Bakris&group=DestinyClass&focus=true&filterFocus=true"
                    >
                      Mask of Bakris
                    </CustomLink>{" "}
                    has an <Emphasis>intrinsic stat focus</Emphasis> of
                    Mobility. If a Mask of Bakris drops while you have a
                    Resilience <Emphasis>armorer ghost mod</Emphasis> equipped,
                    the Resilience stat on the Mask of Bakris may roll with less
                    than 10 points since Mobility and Resilience are both in{" "}
                    <Emphasis>Stat Group 1</Emphasis>. Note that it is still{" "}
                    <b>possible</b> for both Mobility and Resilience to roll
                    with 10 or more points, but only Mobility is{" "}
                    <b>guaranteed</b> to roll with 10 or more points.
                  </Box>
                </CustomListItem>
                <CustomListItem>
                  <Box>
                    There is one outlier{" "}
                    <Emphasis>intrinsic stat focus</Emphasis> found only on{" "}
                    <CustomLink
                      target="_blank"
                      href="/?s=Ursa+Furiosa&group=DestinyClass&focus=true&filterFocus=true"
                    >
                      Ursa Furiosa
                    </CustomLink>
                    .
                    <Box>
                      Ursa Furiosa has an{" "}
                      <Emphasis>intrinsic stat focus</Emphasis> of Intellect,
                      but it is only a{" "}
                      <Emphasis>partial intrinsic stat focus</Emphasis>. The
                      minimum guaranteed Intellect stat value on Ursa Furiosa is
                      6 instead of the usual 10. I am unsure if this{" "}
                      <Emphasis>partial intrinsic stat focus</Emphasis> can
                      override <Emphasis>armorer ghost mods</Emphasis>. If you
                      have video proof of receiving an Ursa Furiosa, while
                      having a Discipline or Strength{" "}
                      <Emphasis>armorer ghost mod</Emphasis> equipped, rolling
                      with at less than 10 in the{" "}
                      <Emphasis>armorer ghost mod's</Emphasis> stat please{" "}
                      <CustomLink href={contactDiscordUrl} target="_blank">
                        contact me
                      </CustomLink>{" "}
                      and I will update this document.
                    </Box>
                  </Box>
                </CustomListItem>
              </CustomList>
            </Box>
          </Box>
        </SectionBody>
        <SectionHeader
          href="contraband"
          title="Contraband Exotics"
          onCopy={handleOpen}
        />
        <SectionBody>
          <Box>
            <Emphasis>Contraband Exotics</Emphasis> are exotic armor pieces that
            do not abide by their <Emphasis>intrinsic stat focus</Emphasis>{" "}
            (i.e. an exotic with less than 10 in the stat that corresponds to
            its <Emphasis>intrinsic stat focus</Emphasis>).{" "}
            <Emphasis>Contraband Exotics</Emphasis> can be very useful when
            making a build that not lean into the{" "}
            <Emphasis>intrinsic stat focus</Emphasis> of your preferred exotic.
            As of writing this document, Intellect is not a very useful stat for
            most PvE builds. Exotics with an{" "}
            <Emphasis>intrinsic stat focus</Emphasis> of Intellect (e.g.{" "}
            <CustomLink
              target="_blank"
              href="/?s=Star-Eater+Scales&group=DestinyClass&focus=true"
            >
              Star-Eater Scales
            </CustomLink>
            ) could be used "more optimially" in a build where those 10
            Intellect points were spent somewhere else.
            <Box sx={{ marginTop: theme.spacing(1) }}>
              <Emphasis>Contraband Exotics</Emphasis> come from a few sources:
            </Box>
            <CustomList dense>
              <CustomListItem>
                <Box>
                  Before the Beyond Light expansion,{" "}
                  <Emphasis>intrinsic stat focuses</Emphasis> did not exist. If
                  you acquired an exotic armor piece before the Beyond Light
                  expansion, it may have less than 10 in the stat that would
                  normally be governed by an{" "}
                  <Emphasis>intrinsic stat focus</Emphasis>, thus making it a{" "}
                  <Emphasis>Contraband Exotic</Emphasis>.
                </Box>
              </CustomListItem>
              <CustomListItem>
                <Box>
                  Both <Emphasis>Advanced Decryption</Emphasis> and{" "}
                  <Emphasis>Precision Decryption</Emphasis> at Rahool can result
                  in a <Emphasis>Contraband Exotic</Emphasis>. At this time I am
                  unsure if receiving a <Emphasis>Contraband Exotic</Emphasis>{" "}
                  from <Emphasis>Advanced/Precision Decryption</Emphasis>{" "}
                  requires the usage of an armorer ghost mod, but all of my{" "}
                  <Emphasis>Contraband Exotic</Emphasis> decryptions were done
                  with an <Emphasis>armorer ghost mod</Emphasis> equipped. I
                  can't think of a reason why you wouldn't want to use an{" "}
                  <Emphasis>armorer ghost mod</Emphasis> when decrypting
                  exotics. Please{" "}
                  <CustomLink href={contactDiscordUrl} target="_blank">
                    contact me
                  </CustomLink>{" "}
                  with video proof of{" "}
                  <Emphasis>Advanced/Precision Decryption</Emphasis> resulting
                  in a <Emphasis>Contraband Exotic</Emphasis> without an{" "}
                  <Emphasis>armorer ghost mod</Emphasis> equipped and I will
                  update this document.
                  <CustomList>
                    <CustomListItem>
                      <Box>
                        <CustomLink
                          target="_blank"
                          href="https://www.youtube.com/watch?v=RnjHmjLaB7Y"
                        >
                          Here
                        </CustomLink>{" "}
                        is video proof of{" "}
                        <Emphasis>Precision Decryption</Emphasis> resulting in a{" "}
                        <Emphasis>Contraband Exotic</Emphasis>.
                      </Box>
                    </CustomListItem>
                    <CustomListItem>
                      <Box>
                        <CustomLink
                          target="_blank"
                          href="https://www.youtube.com/watch?v=J2Ahhz8UJaE"
                        >
                          Here
                        </CustomLink>{" "}
                        is video proof of{" "}
                        <Emphasis>Advanced Decryption</Emphasis> resulting in a{" "}
                        <Emphasis>Contraband Exotic</Emphasis>.
                      </Box>
                    </CustomListItem>
                  </CustomList>
                </Box>
              </CustomListItem>
              <CustomListItem>
                <Box>
                  I am not sure if the <Emphasis>Raw Decryption</Emphasis> at
                  Rahool can result in a <Emphasis>Contraband Exotic</Emphasis>.
                  By <Emphasis>Raw Decryption</Emphasis> I mean: just decrypting
                  the engram the same way you would decrypt a prime engram. I
                  have not yet recieved a <Emphasis>Contraband Exotic</Emphasis>{" "}
                  from a <Emphasis>Raw Decryption</Emphasis>, but I have not
                  done enough <Emphasis>Raw Decryption</Emphasis> to be
                  confident that it is impossible. Please{" "}
                  <CustomLink href={contactDiscordUrl} target="_blank">
                    contact me
                  </CustomLink>{" "}
                  with video proof of a <Emphasis>Raw Decryption</Emphasis>{" "}
                  resulting in a <Emphasis>Contraband Exotic</Emphasis> and I
                  will update this document.
                </Box>
              </CustomListItem>
            </CustomList>
          </Box>
        </SectionBody>
        {/* <SectionHeader
        href="ornaments"
        title="Universal Ornaments"
        onCopy={handleOpen}
      />
      <SectionBody>
        <Box>
          This is not really related to how armor stat rolls work, but it is still useful to know as it affects stats. 
        </Box>
      </SectionBody> */}
        <SectionHeader
          href="references"
          title="References"
          onCopy={handleOpen}
        />
        <SectionBody>
          <CustomList dense>
            <CustomListItem>
              <CustomLink
                target="_blank"
                href="https://www.reddit.com/r/DestinyTheGame/comments/mpaopq/how_armor_stats_roll_an_advanced_insight_into/"
              >
                How Armor Stats Roll: An Advanced Insight into stat rolls
              </CustomLink>
            </CustomListItem>
            <CustomListItem>
              <CustomLink target="_blank" href="https://plugs.mijago.net/">
                Stat Plug Explorer
              </CustomLink>
            </CustomListItem>
            <CustomListItem>
              <CustomLink
                target="_blank"
                href="https://docs.google.com/spreadsheets/d/17ROaEUw4_iIAAuZ-OLdrCssAxcDy9SbdxzGXVcomE7A/edit#gid=1292439318"
              >
                Raw Stat Plug Values Spreadsheet
              </CustomLink>
            </CustomListItem>
          </CustomList>
        </SectionBody>
        <SectionHeader
          href="acknowledgements"
          title="Acknowledgements"
          onCopy={handleOpen}
        />
        <SectionBody>
          <Box>
            <Box>
              These people contributed to the creation of this document in some
              capacity:
            </Box>
            <CustomList dense>
              <CustomListItem>Mijago</CustomListItem>
              <CustomListItem>nznaza</CustomListItem>
              <CustomListItem>cbro</CustomListItem>
              <CustomListItem>Apprentice Salesman</CustomListItem>
              <CustomListItem>Trogdor437</CustomListItem>
              <CustomListItem>SkjaldOfRuss</CustomListItem>
              <CustomListItem>My Derpy Turtle (me)</CustomListItem>
            </CustomList>
          </Box>
        </SectionBody>
        <Snackbar
          open={toastOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          message="Link Copied"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={SlideTransition}
          ContentProps={{
            sx: {
              display: "block",
              textAlign: "center",
            },
          }}
        />
      </Box>
    </Box>
  );
}
