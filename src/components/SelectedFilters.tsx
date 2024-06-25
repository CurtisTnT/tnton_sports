import { IoClose } from "react-icons/io5";

type Props = {
  selectedItems: string[];
  object: { [key: string]: { label: string } };
  onDeleteItem: (newValues: string[]) => void;
};

export default function SelectedFilters(props: Props) {
  const { selectedItems, object, onDeleteItem } = props;

  const renderItem = (item: string) => (
    <button
      key={item}
      type="button"
      onClick={() =>
        onDeleteItem(selectedItems.filter((prev) => prev !== item))
      }
      className="flex items-center gap-1 py-0.5 px-2 bg-pink border border-pink rounded-md text-sm text-white hover:bg-white hover:text-pink"
    >
      <label>{object[item].label}</label>
      <IoClose size={15} />
    </button>
  );

  return (
    !!selectedItems.length && (
      <div className="flex flex-wrap gap-1">
        {selectedItems.map(renderItem)}
      </div>
    )
  );
}
