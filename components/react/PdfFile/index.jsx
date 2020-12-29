/**
 * PDF 文件预览插件
 */
import React, { useState, Fragment } from 'react';
import { Document, Page } from 'react-pdf';
import { Spin, Button, Icon } from 'antd';
import styles from './index.less';

/**
 * @param {url} url 文件地址
 * @param {loading} loading 加载状态
 */
export default function({ url = '', loading = false }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }
    return (
        <Fragment>
            <Document
                file={url}
                noData="暂无PDF文件..."
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                    <div className={styles['pdf_loading']}>
                        <Spin spinning={loading} tip="加载中..." />
                    </div>
                }
                className={styles['pdf_container']}
            >
                {/* 显示全部page */}
                {/* {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))} */}
                {/* 显示单个page */}
                <Page pageNumber={pageNumber} />
                {/* page */}
                <p className={styles['pdf_pageSize']}>
                    {pageNumber || (numPages ? 1 : '--')} / {numPages || '--'}
                </p>
                {/* 分页导航功能 */}
                <div className={styles['pdf_page']}>
                    <Button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                        <Icon type="left" />
                    </Button>
                    <span>
                        {pageNumber || (numPages ? 1 : '--')} / {numPages || '--'}
                    </span>
                    <Button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                        <Icon type="right" />
                    </Button>
                </div>
            </Document>
        </Fragment>
    );
}
