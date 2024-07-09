import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TRIAL_STATUS_CLASS_MAP, TRIAL_STATUS_TEXT_MAP } from "@/constants.jsx";
import { Head, Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, trials, queryParams = null , success, filtered = null }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if(value){
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    if(!filtered){
      router.get(route('trial.index'), queryParams);
    }
    router.get(route("trial." + filtered), queryParams);
  }

  const onKeyPress = (name, e) => {
    if(e.key !== 'Enter') return;

    searchFieldChanged(name, e.target.value)
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if(queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc';
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction= 'asc';
    }
    if(!filtered){
      router.get(route('trial.index'), queryParams);
    }
    router.get(route("trial." + filtered), queryParams);
  }

  const deleteTrial = (trial) => {
    if(!window.confirm('Are you sure you want to delete this trial?'))
    {
      return;
    }
    router.delete(route('trial.destroy', trial.id))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Trials</h2>
          <Link href={route("trial.create")} className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600">Add New</Link>
        </div>
      }>
      <Head title="Trials"></Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">{success}</div>
          )}
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              {/* <pre>{JSON.stringify(trials, undefined, 2)}</pre> */}

              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >ID</TableHeading>
                      <th className="px-3 py-3">Image</th>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Name</TableHeading>
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Status</TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Created Date</TableHeading>
                      <TableHeading
                        name="due_date"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >Due Date</TableHeading>
                      <th className="px-3 py-3">Created By</th>
                      <th className="px-3 py-3">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="Trial Name"
                          onBlur={e => searchFieldChanged('name', e.target.value)}
                          onKeyPress={e => onKeyPress('name', e)}
                          />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={e => searchFieldChanged("status", e.target.value)}>
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {trials.data.map((trial) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={trial.id}>
                        <td className="px-3 py-2">{trial.id}</td>
                        <td className="px-3 py-2">
                          <img src={trial.image_path === '' ? ("https://qtxasset.com/cdn-cgi/image/w=850,h=478,f=auto,fit=crop,g=0.5x0.5/https://qtxasset.com/quartz/qcloud5/media/image/GettyImages-1299105199%20%281%29.jpg?VersionId=CY3sD9nsk7EaRZnl_yAqvKSpCPG8_7L9") : (trial.image_path)} alt={`Image for trial ${trial.id}`} style={{ width: 60}}/>
                        </td>
                        <th className="px-3 py-2 hover:underline text-gray-100 text-nowrap">
                          <Link href={route("trial.show", trial.id)}>
                            {trial.name}
                          </Link>
                        </th>
                        <td className="px-3 py-2">
                          <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            TRIAL_STATUS_CLASS_MAP[trial.status]
                          }>
                            {TRIAL_STATUS_TEXT_MAP[trial.status]}
                          </span>
                        </td>
                        <td className="px-3 py-2">{trial.created_at}</td>
                        <td className="px-3 py-2">{trial.due_date}</td>
                        <td className="px-3 py-2">{trial.createdBy.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                          <Link href={route("trial.edit", trial.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteTrial(trial)}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination links={trials.meta.links}></Pagination>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
