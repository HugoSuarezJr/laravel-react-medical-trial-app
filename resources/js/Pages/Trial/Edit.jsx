import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Create({ auth, trial, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: '',
    name: trial.name || '',
    status: trial.status || '',
    description: trial.description || '',
    due_date: trial.due_date || '',
    priority: trial.priority || '',
    assigned_user_id: trial.assigned_user_id || '',
    _method: 'PUT'
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("trial.update", trial.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit trial "{trial.name}"</h2>
        </div>
      }>
      <Head title="Create Trial"></Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              <div className="mb-4">
                <img src={
                  trial.image_path === '' ? ("https://qtxasset.com/cdn-cgi/image/w=850,h=478,f=auto,fit=crop,g=0.5x0.5/https://qtxasset.com/quartz/qcloud5/media/image/GettyImages-1299105199%20%281%29.jpg?VersionId=CY3sD9nsk7EaRZnl_yAqvKSpCPG8_7L9") :
                  (trial.image_path)
                }
                className="w-64 rounded" />
              </div>
              <div>
                <InputLabel
                  htmlFor="trial_image_path"
                  value="Trial Image"
                />
                <TextInput
                  id="trial_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={e => setData('image', e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="trial_name"
                  value="Trial Name"
                />
                <TextInput
                  id="trial_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={e => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="trial_description"
                  value="Trial Description"
                />
                <TextAreaInput
                  id="trial_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={e => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="trial_due_date"
                  value="Trial Deadline"
                />
                <TextInput
                  id="trial_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={e => setData('due_date', e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="trial_status"
                  value="Trial Status"
                />
                <SelectInput
                  name="status"
                  id="trial_status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.trial_status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="trial_priority"
                  value="Trial Priority"
                />
                <SelectInput
                  name="priority"
                  id="trial_priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="trial_assigned_user"
                  value="Assigned User"
                />
                <SelectInput
                  name="assigned_user_id"
                  id="trial_assigned_user"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map(user => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("trial.index")}
                  className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2">
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-[6px] px-3 text-white rounded transition-all hover:bg-emerald-600">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </AuthenticatedLayout>
  );
}
