import Error from "./Error"

export default ({ error, title, onChangeHandler, name, value, sentence='Write a few sentences about yourself.' }) => (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
    <label htmlFor={name} className="capitalize block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
      {title ? title : name}
    </label>
    <div className="mt-1 sm:mt-0 sm:col-span-2">
      <textarea
        id="about"
        name={name}
        rows={3}
        className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
        value={value}
        onChange={onChangeHandler}
      />
      <p className="mt-2 text-sm text-gray-500">{sentence}</p>
      {error && <Error error={error} />}
    </div>
  </div>
  )