import AsyncStorage from '@react-native-async-storage/async-storage';
import { f } from 'react'

export const FLAG_STORAGE = {flag_popular: 'popular', flag_trending: 'trending'};

export default class DataStore {

    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalDate(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error);
                    })
                }
            }).catch((error) => {
                this.fetchNetData(url).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error) => {
                    reject(error);
                })
            })
        })
    }

    /**
     * 保存数据
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     */
    saveData(url, data, callback) {
        if (!data || !url) {
            return;
        }
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
        console.log('store');
    }

    _wrapData(data) {
        return { data: data, timestamp: new Date().getTime() };
    }

    /**
     * 获取本地数据
     * @param {*} url 
     */
    fetchLocalDate(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    /**
     * 获取网络数据
     * @param {*} url 
     */
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network respponse was not ok.');
                })
                .then((responseData) => {
                    this.saveData(url, responseData);
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }

    /**
     * 检查timestamp是否在有效期之内
     * @param {*} timestamp 
     * true-需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false;
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false;
        }
        if (currentDate.getHours() - targetDate.getHours() > 4) {
            //有效期4个小时
            return false;
        }
        return true;
    }
}