import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";


export default function Create({ auth, patient, trials, users }) {
  const { data, setData, post, errors, reset } = useForm({
    image: '',
    name: patient.name || '',
    status: patient.status || '',
    description: patient.description || '',
    due_date: patient.due_date || '',
    trial_id: patient.trial_id || '',
    priority: patient.priority || '',
    assigned_user_id: patient.assigned_user_id || '',
    _method: 'PUT'
  });

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("patient.update", patient.id));
  };
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit patient "{patient.name}"</h2>
        </div>
      }>
      <Head title="Create Patient"></Head>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              {patient.image_path && (
                <div className="mb-4">
                  <img src={patient.image_path} className="w-64 rounded" />
                </div>
              )}
              <div>
                <InputLabel
                  htmlFor="patient_trial"
                  value="Trial"
                />
                <SelectInput
                  name="trial_id"
                  id="patient_trial"
                  value={data.trial_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("trial_id", e.target.value)}
                >
                  <option value="">Select Trial</option>
                  {trials.data.map(trial => (
                    <option value={trial.id} key={trial.id}>{trial.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.trial_id} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_image_path"
                  value="Patient Image"
                />
                <TextInput
                  id="patient_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={e => setData('image', e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_name"
                  value="Patient Name"
                />
                <TextInput
                  id="patient_name"
                  type="text"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  isFocused={true}
                  onChange={e => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_description"
                  value="Patient Description"
                />
                <TextAreaInput
                  id="patient_description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={e => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_due_date"
                  value="Patient Deadline"
                />
                <TextInput
                  id="patient_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={e => setData('due_date', e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_status"
                  value="Patient Status"
                />
                <SelectInput
                  name="status"
                  id="patient_status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.patient_status} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_priority"
                  value="Patient Priority"
                />
                <SelectInput
                  name="priority"
                  id="patient_priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("priority", e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2"/>
              </div>
              <div className="mt-4">
                <InputLabel
                  htmlFor="patient_assigned_user"
                  value="Assigned User"
                />
                <SelectInput
                  name="assigned_user_id"
                  id="patient_assigned_user"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("assigned_user_id", e.target.value)}
                >
                  <option value="">Select User</option>
                  {users.data.map(user => (
                    <option value={user.id} key={user.id}>{user.name}</option>
                  ))}
                </SelectInput>
                <InputError message={errors.assigned_user_id} className="mt-2"/>
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route("patient.index")}
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
