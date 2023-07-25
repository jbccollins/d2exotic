"use client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Box,
  BoxProps,
  IconButton,
  Link,
  List,
  ListItem,
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

const SectionBody = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "left",
}));

const CustomLink = styled(Link)(({ theme }) => ({
  color: "white",
  textDecoration: "none",
  borderBottom: "3px solid white",
}));

type SectionHeaderProps = {
  href: string;
  title: string;
  onCopy: () => void;
  sx?: BoxProps["sx"];
};

const SectionHeader = ({ href, title, onCopy, sx }: SectionHeaderProps) => {
  const scrollToAnchor = useScrollToById(8);
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
        href={`#${href}`}
        sx={{
          color: "white",
          marginRight: theme.spacing(1),
          textDecoration: "none",
          borderBottom: "3px solid white",
        }}
      >
        <Typography variant="h5"># {title}</Typography>
      </CustomLink>
      <IconButton aria-label="copy link" size="small" onClick={handleClick}>
        <ContentCopyIcon sx={{ color: "white" }} />
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
  const scrollToAnchor = useScrollToById(8);
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
  }, []);

  return (
    <Box
      id="help"
      sx={{
        padding: theme.spacing(3),
        background: "#121212",
        height: "100vh",
        overflowY: "auto",
      }}
    >
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
          with a few exceptions. This document outlines the rules and exceptions
          that govern armor stat rolls.
        </Box>
      </SectionBody>
      <SectionHeader
        href="rules"
        title="Armor Roll Rules"
        onCopy={handleOpen}
      />
      <SectionBody>
        <Box>
          In order to understand the rules that govern armor stat rolls we must
          first define the concept of "stat groups". The six armor stats in
          Destiny 2 are grouped in two buckets of three stats each:
          <List dense>
            <ListItem>1. Mobility, Resilience and Recovery</ListItem>
            <ListItem>2. Discipline, Intellect and Strength</ListItem>
          </List>
          We will refer to these stat groups as "Stat Group 1" and "Stat Group
          2" moving forward.
          <Box>
            Given these stat groups, the rules that govern legendary armor stat
            rolls are as follows:
          </Box>
          <List dense>
            <ListItem>1. No single base stat value may be less than 2</ListItem>
            <ListItem>
              2. No single base stat value may equal 3, 4 or 5
            </ListItem>
            <ListItem>
              3. No single base stat value may be greater than 30
            </ListItem>
            <ListItem>
              4. The sum of the base stat values in each stat group may be no
              less than 22 and no greater than 34
            </ListItem>
            <ListItem>
              5. While wearing an "armorer" ghost mod, armor pieces with random
              stats you acquire will have a guaranteed minimum of 10 in the stat
              that corresponds to the equpped armorer ghost mod
            </ListItem>
          </List>
          <Box>
            To put that in plain english: any single stat can roll with any
            value between 2 and 30 except for 3, 4 or 5. The maximum total base
            stat value for any legendary armor piece is 68, where 34 stat points
            come from Stat Group 1 and 34 stat points come from Stat Group 2.
            The minimum total base stat value for any legendary armor piece is
            44, where 22 stat points come from Stat Group 1 and 22 stat points
            come from Stat Group 2.
          </Box>
          <Box sx={{ marginTop: theme.spacing(1) }}>
            Additionally, armorer ghost mods (e.g.{" "}
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
            distributed. These rules involve triplets of numbers called "Stat
            Plugs". This document will not go into detail about Stat Plug rules,
            but you can read more about such rules in{" "}
            <CustomLink
              target="_blank"
              href="https://www.reddit.com/r/DestinyTheGame/comments/mpaopq/how_armor_stats_roll_an_advanced_insight_into/"
            >
              this reddit post
            </CustomLink>{" "}
            and explore Stat Plug values on{" "}
            <CustomLink target="_blank" href="https://plugs.mijago.net/">
              this website
            </CustomLink>{" "}
            if you are curious. For the vast majority of people the five rules
            listed above are all that matter.
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
          Exotic armor rolls follow the same rules as legendary armor rolls with
          a few exceptions:
          <List dense>
            <ListItem>
              <Box>
                1. Some older exotics armor pieces always roll with up to +3
                total additional "intrinsic stat points" with fixed allocations
                in specific stats, up to a maximum of +2 stat points in a single
                stat. Such intrinsic stats allow some exotic armor pieces to
                achive minimum base stat values of 3 or 4 and maximum base stat
                values of 31 or 32 which are impossible for Legendary armor
                pieces to achieve. For example{" "}
                <CustomLink
                  target="_blank"
                  href="/?s=Gwisin+Vest&group=DestinyClass&stats=true&filterStats=true"
                >
                  Gwisin Vest
                </CustomLink>{" "}
                always rolls with intrinsic stat points of +2 Mobility and +1
                Resilience. A full list of exotic armor pieces with intrinsic
                stat points can be found{" "}
                <CustomLink
                  target="_blank"
                  href="/?group=DestinyClass&stats=true&filterStats=true"
                >
                  here
                </CustomLink>
                .
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                2. Some exotic armor pieces have an "intrinsic stat focus" that
                can override a user's equipped armorer ghost mod. An exotic
                armor piece with an intrinsic stat focus is (almost always)
                guaranteed to roll with a minimum of 10 in the stat that
                corresponds to the intrinsic stat focus. More on that almost
                always clarification can be found in the{" "}
                <CustomLink href="#contraband">Contraband Exotics</CustomLink>{" "}
                section of this document. A full list of exotic armor pieces
                with an intrinsic stat focus can be found{" "}
                <CustomLink
                  target="_blank"
                  href="/?group=DestinyClass&focus=true&filterFocus=true"
                >
                  here
                </CustomLink>
                .
              </Box>
            </ListItem>
          </List>
          <Box sx={{ marginTop: theme.spacing(1) }}>
            While intrinsic stat points are quite straightforward, there are a
            few additional things to note about how intrinsic stat focuses work:
            <List dense>
              <ListItem>
                <Box>
                  1. If an exotic armor piece has an intrinsic stat focus and
                  you have an armorer ghost mod equipped, the intrinsic stat
                  focus can override the armorer ghost mod if, and only if, the
                  stats associated with the exotic armor piece's intrinsic stat
                  focus and the armorer ghost mod are both in the same stat
                  group. For example:{" "}
                  <CustomLink
                    target="_blank"
                    href="/?s=Mask+of+Bakris&group=DestinyClass&focus=true&filterFocus=true"
                  >
                    Mask of Bakris
                  </CustomLink>{" "}
                  has an intrinsic stat focus of Mobility. If a Mask of Bakris
                  drops while you have a Resilience armorer ghost mod equipped,
                  the Resilience stat on the Mask of Bakris may roll with less
                  than 10 points since Mobility and Resilience are both in Stat
                  Group 1. It is possible for both Mobility and Resilience to
                  both roll with 10 or more points, but only Mobility is
                  guaranteed to roll with 10 or more points as the intrinsic
                  stat focus takes precedence over the armorer ghost mod.
                </Box>
              </ListItem>
              <ListItem>
                <Box>
                  2. There is one outlier intrinsic stat focus found only on{" "}
                  <CustomLink
                    target="_blank"
                    href="/?s=Ursa+Furiosa&group=DestinyClass&focus=true&filterFocus=true"
                  >
                    Ursa Furiosa
                  </CustomLink>
                  .
                  <Box>
                    Ursa Furiosa has an intrinsic stat focus of Intellect, but
                    it is only a "partial intrinsic stat focus". The minumum
                    guaranteed Intellect stat value on Ursa Furiosa is 6 instead
                    of the usual 10. I am unsure if this partial intrinsic focus
                    can override armorer ghost mods. If you have video proof of
                    recieving an Ursa Furiosa while having a Discipline or
                    Strength armorer ghost mod equipped and not rolling with at
                    least 10 in the armorer ghost mod's stat please{" "}
                    <CustomLink href={contactDiscordUrl} target="_blank">
                      contact me
                    </CustomLink>{" "}
                    and I will update this document.
                  </Box>
                </Box>
              </ListItem>
            </List>
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
          "Contraband Exotics" are exotic armor pieces that do not abide by
          their intrinsic stat focus; i.e. an exotic with less than 10 in the
          stat that corresponds to its intrinsic stat focus. There are a few
          ways to acquire a Contraband Exotic:
          <List dense>
            <ListItem>
              <Box>
                1. Before the Beyond Light expansion released intrinsic stat
                focuses did not exist. If you acquired an exotic armor piece
                before the Beyond Light expansion released it may have less than
                10 in the stat that would normally be governed by an intrinsic
                stat focus.
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                2. Both "Advanced Decryption" and "Precision Decryption" at
                Rahool can result in a Contraband Exotic. At this time I am
                unsure if receiving a Contraband Exotic from Advanced/Precision
                Decryption requires the usage of an armorer ghost mod, but all
                of my Contraband Exotic decryptions were done with an armorer
                ghost mod equipped. I can't think of a reason why you wouldn't
                want to use an armorer ghost mod when decrypting exotics. Please{" "}
                <CustomLink href={contactDiscordUrl} target="_blank">
                  contact me
                </CustomLink>{" "}
                with video proof of Advanced/Precision decryption resulting in a
                Contraband Exotic without a ghost mod equipped and I will update
                this document.
                <List>
                  <ListItem>
                    <Box>
                      <CustomLink
                        target="_blank"
                        href="https://www.youtube.com/watch?v=RnjHmjLaB7Y"
                      >
                        Here
                      </CustomLink>{" "}
                      is video proof of Precision Decryption resulting in a
                      Contraband Exotic.
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box>
                      <CustomLink
                        target="_blank"
                        href="https://www.youtube.com/watch?v=J2Ahhz8UJaE"
                      >
                        Here
                      </CustomLink>{" "}
                      is video proof of Advanced Decryption resulting in a
                      Contraband Exotic.
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </ListItem>
            <ListItem>
              <Box>
                3. I am not sure if the "raw" decryption at Rahool can result in
                a Contraband Exotic. By "raw" decryption I mean: just decrypting
                the engram the same way you would decrypt a prime engram. I have
                not yet recieved a Contraband Exotic from a raw decryption, but
                I have not done enough raw decryptions to be confident that it
                is impossible. Please{" "}
                <CustomLink href={contactDiscordUrl} target="_blank">
                  contact me
                </CustomLink>{" "}
                with video proof of this happening and I will update this
                document.
              </Box>
            </ListItem>
          </List>
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
      <SectionHeader href="references" title="References" onCopy={handleOpen} />
      <SectionBody>
        <List dense>
          <ListItem>
            <Box sx={{ marginRight: theme.spacing(1) }}>1.</Box>
            <CustomLink
              target="_blank"
              href="https://www.reddit.com/r/DestinyTheGame/comments/mpaopq/how_armor_stats_roll_an_advanced_insight_into/"
            >
              How Armor Stats Roll: An Advanced Insight into stat rolls
            </CustomLink>
          </ListItem>
          <ListItem>
            <Box sx={{ marginRight: theme.spacing(1) }}>2.</Box>
            <CustomLink target="_blank" href="https://plugs.mijago.net/">
              Stat Plug Explorer
            </CustomLink>
          </ListItem>
          <ListItem>
            <Box sx={{ marginRight: theme.spacing(1) }}>3.</Box>
            <CustomLink
              target="_blank"
              href="https://docs.google.com/spreadsheets/d/17ROaEUw4_iIAAuZ-OLdrCssAxcDy9SbdxzGXVcomE7A/edit#gid=1292439318"
            >
              Raw Stat Plug Values Spreadsheet
            </CustomLink>
          </ListItem>
        </List>
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
          <List dense>
            <ListItem>1. Mijago</ListItem>
            <ListItem>2. nznazarec</ListItem>
            <ListItem>3. cbro</ListItem>
            <ListItem>4. Apprentice Salesman</ListItem>
            <ListItem>5. My Derpy Turtle (me)</ListItem>
          </List>
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
  );
}
