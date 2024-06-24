type Props = {
  label: string;
  filterItems: { type: string; label: string }[];
  selectedItems: string[];
  onCheckItem: (items: string[]) => void;
};

export default function SideBarFilter(props: Props) {
  const { label, filterItems, selectedItems, onCheckItem } = props;

  return (
    <div>
      <h3 className="text-lg uppercase font-semibold text-pink">{label}</h3>

      <div className="max-h-[120px] mt-2 overflow-y-scroll overscroll-contain space-y-2 p-2 shadow-[inset_0px_0px_5px_1px_rgb(0,0,0,0.1)] rounded-lg scrollbar-hide">
        {filterItems.map(({ type, label }) => {
          const isChecked = selectedItems.includes(type);
          return (
            <div key={type} className="flex items-center gap-3">
              <input
                type="checkbox"
                name={type}
                id={type}
                checked={isChecked}
                onChange={() =>
                  onCheckItem(
                    isChecked
                      ? selectedItems.filter((item) => item !== type)
                      : [...selectedItems, type]
                  )
                }
                className="w-5 h-5 accent-pink"
              />

              <label htmlFor={type}>{label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
