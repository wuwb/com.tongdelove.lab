/* eslint-disable no-irregular-whitespace */
import { CheckBox } from '@/components/ui/Checkbox/Checkbox';
import { NumberInput, PercentInput, TextInput } from '@/components/ui/Input/Input';
import { Suggestion } from '@/components/ui/Suggestion/Suggestion';
import { FundDataItem } from '@/server/service';
import { useAppState, useDispatch } from '@/server/store';
import noop from 'lodash/noop';
import { useCallback, useState } from 'react';

export function Settings() {
  const state = useAppState();
  const dispatch = useDispatch();
  const {
    price,
    amount,
    increasePercentPerGrid,
    numberOfRetainedProfits,
    hasMiddleGrid,
    hasBigGrid
  } = state;
  return (
    <form>
      <div>
        <div className="block w-full mb-1 py-1">基本设置</div>
        <Fund />
        <div>
          <div>价　　格</div>
          <div>
            <NumberInput
              value={price}
              onChange={(value: number) => {
                if (value) {
                  dispatch('price', value);
                }
              }}
            />
            <div>元</div>
          </div>
        </div>
        <div last>
          <div>每份金额</div>
          <div>
            <NumberInput
              value={amount}
              onChange={(value: number) => {
                if (value) {
                  dispatch('amount', value);
                }
              }}
            />
            <div>元</div>
          </div>
        </div>
      </div>
      <div>
        <div>留利润</div>
        <div last>
          <div>留存份数</div>
          <div>
            <NumberInput
              value={numberOfRetainedProfits}
              onChange={(value: number) => {
                dispatch('numberOfRetainedProfits', value);
              }}
            />
            <div>份</div>
          </div>
        </div>
      </div>
      <div>
        <div>逐格加码</div>
        <div last>
          <div>加码幅度</div>
          <div>
            <PercentInput
              value={increasePercentPerGrid}
              onChange={(value: number) => {
                dispatch('increasePercentPerGrid', value);
              }}
            />
            <div>%</div>
          </div>
        </div>
      </div>
      <div last>
        <div>一网打尽</div>
        <div>
          <div>中　　网</div>
          <div>
            <CheckBox
              checked={hasMiddleGrid}
              onChange={(value: boolean) => {
                dispatch('hasMiddleGrid', value);
              }}
            />
          </div>
        </div>
        <div last>
          <div>大　　网</div>
          <div>
            <CheckBox
              checked={hasBigGrid}
              onChange={(value: boolean) => {
                dispatch('hasBigGrid', value);
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

function Fund() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const onSelectCallback = useCallback(
    (item: FundDataItem) => {
      const { FundBaseInfo } = item;
      // 单位净值
      const { DWJZ } = FundBaseInfo || {};

      if (DWJZ) {
        dispatch('price', DWJZ);
      }

      setName(item.NAME);
    },
    [dispatch]
  );

  return (
    <>
      <div>
        <div>基　　金</div>
        <Suggestion
          inputProps={{ placeholder: '请输入基金代码、拼音或者简称' }}
          onSelect={onSelectCallback}
        />
      </div>
      {name && (
        <div>
          <div>基金名称</div>
          <div>
            <TextInput value={name} readOnly onChange={noop} />
          </div>
        </div>
      )}
    </>
  );
}
