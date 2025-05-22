import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  BookOpenIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const mockTracks = [
  {
    id: 1,
    name: 'Lógica Básica',
    grade: '5º ano',
    level: 'Iniciante',
    modules: [
      { id: 1, title: 'O que é um computador?' },
      { id: 2, title: 'Partes do computador' }
    ]
  },
  {
    id: 2,
    name: 'Programação Web',
    grade: '6º ano',
    level: 'Intermediário',
    modules: [
      { id: 1, title: 'HTML e Tags Básicas' }
    ]
  }
];

const TeacherDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel do Professor</h1>

      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-100 p-1 mb-6">
          <Tab
            className={({ selected }) =>
              `flex items-center space-x-2 w-full rounded-lg py-2.5 px-3 text-sm font-medium leading-5
              ${selected
                ? 'bg-white text-blue-700 shadow'
                : 'text-gray-700 hover:bg-white/[0.12] hover:text-blue-600'
              }`
            }
          >
            <BookOpenIcon className="h-5 w-5" />
            <span>Minhas Trilhas</span>
          </Tab>
        </Tab.List>

        <Tab.Panels>
          {/* Trilhas */}
          <Tab.Panel>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ano Escolar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nível</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Módulos</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockTracks.map((track) => (
                    <tr key={track.id}>
                      <td className="px-6 py-4 font-medium text-gray-900">{track.name}</td>
                      <td className="px-6 py-4">{track.grade}</td>
                      <td className="px-6 py-4">{track.level}</td>
                      <td className="px-6 py-4">
                        <ul className="list-disc ml-5 text-sm text-gray-600">
                          {track.modules.map((mod) => (
                            <li key={mod.id}>{mod.title}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          <PencilIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TeacherDashboard;