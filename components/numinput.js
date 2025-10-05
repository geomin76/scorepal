import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

// MUI Number Input (JavaScript version)
export default function MuiNumberInput({
  id = "mui-number-input",
  value,
  onChange,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  label = "Number",
  required = false,
  helperText = "",
  size = "medium",
  variant = "outlined",
  fullWidth = false,
}) {
  const isEmpty = value === "" || value === null || value === undefined;

  const numberValue = isEmpty ? "" : Number(value);
  const isBelowMin = !isEmpty && Number(numberValue) < min;
  const isAboveMax = !isEmpty && Number(numberValue) > max;
  const hasError = isBelowMin || isAboveMax || (required && isEmpty);

  function clamp(n) {
    if (Number.isNaN(n)) return n;
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  const handleInputChange = (e) => {
    const v = e.target.value;
    if (v === "") {
      onChange("");
      return;
    }
    const parsed = Number(v);
    if (Number.isNaN(parsed)) {
      return;
    }
    onChange(clamp(parsed));
  };

  const handleStep = (dir) => () => {
    const base = isEmpty ? 0 : Number(numberValue);
    const next = clamp(Number((base + dir * step).toFixed(12)));
    onChange(next);
  };

  return (
    <Box display={fullWidth ? "block" : "inline-flex"} alignItems="center">
      <TextField
        id={id}
        label={label}
        value={numberValue}
        onChange={handleInputChange}
        type="number"
        size={size}
        variant={variant}
        fullWidth={fullWidth}
        required={required}
        helperText={
          hasError
            ? isBelowMin
              ? `Minimum is ${min}`
              : isAboveMax
              ? `Maximum is ${max}`
              : helperText
            : helperText
        }
        error={hasError}
        inputProps={{
          min: Number.isFinite(min) ? min : undefined,
          max: Number.isFinite(max) ? max : undefined,
          step,
          inputMode: "decimal",
          "aria-describedby": hasError ? `${id}-error` : undefined,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="decrement" onClick={handleStep(-1)} size="small">
                <RemoveIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="increment" onClick={handleStep(1)} size="small">
                <AddIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{ id: hasError ? `${id}-error` : undefined }}
      />
    </Box>
  );
}

MuiNumberInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  required: PropTypes.bool,
  helperText: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium"]),
  variant: PropTypes.oneOf(["outlined", "filled", "standard"]),
  fullWidth: PropTypes.bool,
};