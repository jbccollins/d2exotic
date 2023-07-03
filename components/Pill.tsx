export type PillProps = {
  text: string;
  icon?: string;
  color?: string;
};

export const Pill = (props: PillProps) => {
  return (
    <div
      className="pill inline-flex items-center text-s p-1 pl-2 pr-2 rounded-2xl mr-1"
      style={{ background: props.color ?? "blue", minHeight: "32px" }}
    >
      {props.icon && (
        <div className="pill-icon mr-2 absolute">
          <img width={24} height={24} src={props.icon} />
        </div>
      )}
      <div
        // style={{ fontSize: 14 }}
        className={`pill-text${
          props.icon ? (props.text.length > 0 ? " ml-8" : " ml-6") : ""
        }`}
      >
        {props.text}
      </div>
    </div>
  );
};
