import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/auth';
import { FileText, Users, Upload } from 'lucide-react';

function Dashboard() {
  const [user] = useAtom(userAtom);

  const stats = [
    { name: 'Total Templates', value: '12', icon: FileText },
    { name: 'Active Users', value: '24', icon: Users },
    { name: 'Files Uploaded', value: '128', icon: Upload },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your compliance reports.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;