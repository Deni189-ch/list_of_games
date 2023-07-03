import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {Select, Space, Card, Button, Typography} from 'antd';

import { GameDataObject } from "../../types";
import {filterAndSortData, getCurrencyOptions, getProviderOptions, mockApiRequest} from "./utils";
import './style.modules.scss';

const { Title } = Typography;
const { Meta } = Card;


export const HomePage = () => {
  const [jsonData, setJsonData] = useState<GameDataObject | null>(null);
  const [visibleItems, setVisibleItems] = useState(12);

  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const fetchMockApiRequest = () => {
    mockApiRequest().then((data) => {
      setJsonData(data);
    });
  }

  useEffect(() => {
    fetchMockApiRequest()
  }, []);

  useEffect(() => {
    if(selectedProvider || selectedCurrency) {
      fetchMockApiRequest()
    }
  }, [selectedProvider, selectedCurrency]);

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 12);
  };
  const handleShowDefault = () => {
    setVisibleItems(12)
  };

  const startIndex = 0;
  const endIndex = visibleItems

  const slicedData = useMemo(() => {
    return filterAndSortData(jsonData, selectedProvider, selectedCurrency, startIndex, endIndex);
  }, [jsonData, selectedProvider, selectedCurrency, startIndex, endIndex]);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value);
  };

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
  };

  const currencyOptions = useMemo(() => jsonData ? getCurrencyOptions(jsonData) : [], [jsonData]);
  const providerOptions = useMemo(() => jsonData ? getProviderOptions(jsonData) : [], [jsonData]);

  if (!jsonData) return <div>Загрузка данных...</div>;

  return (
    <div className="App">
      <Space wrap>
        <Select
          onChange={handleCurrencyChange}
          style={{ width: 120 }}
          defaultValue="Валюта"
          options={[
            { value: '', label: 'All' },
            ...currencyOptions
          ]}
        />

        <Select
          onChange={handleProviderChange}
          defaultValue="Провайдер"
          style={{ width: 120 }}
          options={[
            { value: '', label: 'All' },
            ...providerOptions
          ]}
        />

        <div>
          Kол. игр: {!!slicedData ? Object.entries(slicedData).length : 0}
        </div>
      </Space>

      <div className="cardsList" >
        {
          !!slicedData && Object.entries(slicedData).length > 0
            ? Object.entries(slicedData).map(([key, value]) => {
              return (
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`${value.demo}`}
                    key={key}
                  >
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img
                        alt="example"
                        src={`https://cdn2.softswiss.net/i/s2/${key}.png`}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png';
                        }}
                      />}
                    >
                      <Meta title={value.title} description={value.provider} />
                    </Card>
                  </Link>
                )
            })
            : <Title> Игр не найдено</Title>
        }
      </div>

      { !!slicedData && Object.entries(slicedData).length > 0 &&
        <div className="addGames">
          <Button type="primary" onClick={handleShowMore}>Показать еще</Button> &nbsp;
          {Object.entries(slicedData).length > 12 && <Button type="primary" onClick={handleShowDefault}>Сбросить</Button>}
        </div>
      }

    </div>
  );
}
