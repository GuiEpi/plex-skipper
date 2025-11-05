import "./delay-slider.css";

type DelaySliderProps = {
  id: string;
  delay: number;
  onChange: (newDelay: number) => void;
  label: string;
};

const DelaySlider: React.FC<DelaySliderProps> = ({
  id,
  delay,
  onChange,
  label,
}) => {
  const [value, setValue] = useState(delay);

  useEffect(() => {
    setValue(delay);
  }, [delay]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onChange(newValue);
  };

  const handleReset = () => {
    setValue(0);
    onChange(0);
  };

  return (
    <div className="delay-slider">
      <div className="slider-header">
        <label htmlFor={id}>
          {label}: {value / 1000}s
        </label>
        <button className="reset-button" onClick={handleReset}>
          {browser.i18n.getMessage("delayButton")}
        </button>
      </div>
      <input
        type="range"
        id={id}
        min="0"
        max="30000"
        step="100"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default DelaySlider;
