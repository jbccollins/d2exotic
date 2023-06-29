export type PillProps = {
  text: string;
  icon?: string;
  color?: string;
};

export const Pill = (props: PillProps) => {
  return (
    <div
      className="pill inline-flex items-center text-s p-1 pl-2 pr-2 rounded-2xl mr-1 h-8"
      style={{ background: props.color ?? "blue" }}
    >
      {props.icon && (
        <div className="pill-icon mr-2 absolute">
          <img width={24} height={24} src={props.icon} />
        </div>
      )}
      <div className={`pill-text${props.icon ? " ml-8" : ""}`}>
        {props.text}
      </div>
    </div>
  );
};
