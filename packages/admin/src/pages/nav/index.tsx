import React from 'react';
import { Link } from '@umijs/max';
import { Anchor } from 'antd';
import DefaultLayout from '../../layouts';
import navs from './navs';

const NavPage = ({ data }) => {
  return (
    <DefaultLayout full={true}>
      <div className="flex -mt-10">
        <div className="w-80 bg-gray-100">
          <div style={{ marginTop: '50px' }}>
            <Anchor affix={true} showInkInFixed={true}>
              {navs.map((item, index) => {
                return <Link href={`#${item.name}`} key={item.name} title={item.name} />;
              })}
            </Anchor>
          </div>
        </div>
        <div className="p-10">
          {navs.map((item, index) => {
            return (
              <div
                className="mb-4 border-gray-200 border-solid border-b p-4 bg-white"
                key={item.name}
              >
                <h3 id={item.name} className="text-lg font-bold mb-4 text-red-600">
                  {item.name}
                </h3>
                <div className="grid grid-cols-6 gap-3 ">
                  {item.children.map((item, index) => {
                    return (
                      <div key={item.name}>
                        <a key={item.name} href={item.path} className="block hover:bg-gray-100">
                          {item.icon ? (
                            <img
                              className="w-5 float-left rounded"
                              src={item.icon}
                              alt={item.name}
                            />
                          ) : null}
                          <div className="ml-6">
                            <p className="font-bold">{item.name}</p>
                            <p className="text-gray-400 text-xs line-clamp-2">{item.desc}</p>
                            <p className="text-gray-400 text-xs">{item.work}</p>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NavPage;
