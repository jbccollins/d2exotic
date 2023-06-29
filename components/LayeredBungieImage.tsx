import BungieImage, { BungieImageProps } from "./BungieImage";

type LayeredBungieImageProps = BungieImageProps & {
  icons: (string | null)[];
};
export default function LayeredBungieImage(props: LayeredBungieImageProps) {
  const { icons, ...rest } = props;
  let style = rest.style ?? {
    height: "20px",
    width: "20px",
  };
  return (
    <div className="relative" style={{ ...style }}>
      {icons
        .filter((x) => x !== null)
        .map((icon) => {
          return (
            <div key={icon} className="absolute">
              <BungieImage
                {...rest}
                style={style}
                src={icon as string}
                // style={{
                //   top: 0,
                //   left: 0,
                //   width: "100%",
                //   height: "100%",
                //   backgroundImage: `url("${icon}")`,
                //   backgroundSize: "contain",
                //   backgroundRepeat: "no-repeat",
                //   backgroundPosition: "center",
                //   zIndex: index
                // }}
              />
            </div>
          );
        })}
    </div>
  );
}
