export default ({ onChangeHandler, name, data, label, selected }) => (
<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          {label ? label : name}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="flex rounded-md shadow-sm">
            <select defaultValue={selected} onChange={onChangeHandler} name={name} id={name}>
                {Object.keys(data).sort().map((val, i) => (
                    <option selected={selected === val} value={val} key={`${val}-${i}`}>{data[val]}</option>
                ))}
            </select>
          </div>
        </div>
      </div>
)