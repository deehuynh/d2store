import React, { useState, useEffect} from 'react';
import fireDb from '../firebase';
import {Link, Switch, Route, useParams, useRouteMatch} from 'react-router-dom';
import useFormatUrl from '../Hooks/useFormatUrl';
import useQuery from '../Hooks/useQuery';
import useGetData from '../Hooks/useGetData';
import ReactHtmlPaser from 'react-html-parser';

function Article (props) {
    const url = useFormatUrl(props.state.title);
    return (
        <Link to={`help/${url}?ar=${props.state.key}`} className='article'>
            <img src={props.state.image} />
            <p>{props.state.title}</p>
        </Link>
    );
}

function ArticleDetail (props) {
    const basicInformation = {
        title: '',
        image: '',
        public: true,
        content: '',
    };
    const {title} = useParams();
    const key = props.ar;
    const [state, setState] = useState(basicInformation);
    useEffect (()=>{
        fireDb.ref('help').once('value', getData);
    }, [key]);
    function getData (snapshot) {
        let data = [];
        snapshot.forEach((item)=>{
          let val = item.val();
          if (key === item.key) {
            data.push({...val, key: key});
          }
        });
        setState(data[0]);
    }

    return (
      <>
        <div className="headings">
          <Link to={`/help`}>Help</Link>
          <span><i className="fas fa-chevron-right"></i></span>
          <Link to={`/help/${title}?ar=${key}`}>{state.title}</Link>
        </div>

        <div className='help-content'>
            {ReactHtmlPaser(state.content)}
        </div>
      </>
    );
}

export default function Help () {
    const [state, setState] = useState(null);
    let {path, url} = useRouteMatch();
    let query = useQuery();
    useEffect (()=>{
        fireDb.ref('help').once('value', getData);
    }, []);

    function getData (snapshot) {
        const tmp = [];
        snapshot.forEach((item)=>{
            tmp.push(
                {...item.val(), key: item.key}
            );
        });
        setState(tmp);
    }

    const data = [];

    state && state.forEach((item, index)=>{
        data.push(
            <Article key={index} state={item} />
        );
    });
    
    return (
        <Switch>
          <Route exact path='/help'>
            {data}
            <div className="clear-fix"></div>
          </Route>

          <Route path={`${path}/:title`}>
            <ArticleDetail ar={query.get("ar")} />
          </Route>
        </Switch>
    );
}