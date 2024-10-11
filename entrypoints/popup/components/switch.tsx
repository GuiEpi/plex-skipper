import "./switch.css";

type SwitchProps = {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  disabled?: boolean;
  labelId?: string;
};

const Switch: React.FC<SwitchProps> = ({
  id,
  checked,
  onChange,
  label = null,
  disabled = false,
  labelId = "",
}) => {
  if (label) {
    return (
      <div className="switch-with-label">
        <div className="switch-with-label-content">
          <p>{label}</p>
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
          />
          <label className="switch-label" htmlFor={id} id={labelId}></label>
        </div>
      </div>
    );
  } else {
    return (
      <div className="switch">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <label className="switch-label" htmlFor={id} id={labelId}></label>
      </div>
    );
  }
};

export default Switch;
