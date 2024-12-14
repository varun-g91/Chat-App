interface GenderCheckboxProps {
    selectedGender: string;
    onGenderChange: (gender: string) => void;
}

const GenderCheckbox: React.FC<GenderCheckboxProps> = ({
    selectedGender,
    onGenderChange,
}) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className="label gap-2 cursor-pointer">
                    <span className="label-text">Male</span>
                    <input
                        type="radio"
                        name="gender"
                        className="radio border-slate-900"
                        checked={selectedGender === "Male"}
                        onChange={() => onGenderChange("Male")}
                    />
                </label>
            </div>
            <div className="form-control">
                <label className="label gap-2 cursor-pointer">
                    <span className="label-text">Female</span>
                    <input
                        type="radio"
                        name="gender"
                        className="radio border-slate-900"
                        checked={selectedGender === "Female"}
                        onChange={() => onGenderChange("Female")}
                    />
                </label>
            </div>
        </div>
    );
};

export default GenderCheckbox;
