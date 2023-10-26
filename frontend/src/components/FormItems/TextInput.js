import Error from "./Error"

export default ({error, title, name, value, onChangeHandler, required}) => (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          {title ? title : name}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <div className="max-w-lg flex rounded-md shadow-sm">
            <input
              value={value}
              onChange={onChangeHandler}
              type="text"
              name={name}
              id={name}
              required={required}
              className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
            />
            
          </div>
          {error && <Error error={error} />}
        </div>
      </div>
  )