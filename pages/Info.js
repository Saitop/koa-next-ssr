import React, { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import { map } from "lodash";

import api from "../lib/utils/api-client";
import { withSSR } from "../lib/_ssr";

import Page from "../lib/components/Page";
import { H1 } from "../lib/components/Headers";

// eslint-disable-next-line react/require-default-props
class InfoScreen extends Component {
  static propTypes = {
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        comment: PropTypes.string.isRequired,
      }),
    ),
    loginInfo: PropTypes.shape({
      [PropTypes.string]: PropTypes.string,
    }),
  };

  static defaultProps = {
    comments: [],
    loginInfo: { access_token: "" },
  };

  state = {
    comments: this.props.comments,
    loginInfo: this.props.loginInfo,
    text: "",
    loading: false,
    error: null,
    users: [],
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: null });

    try {
      // Do some validations
      if (!this.state.text) {
        throw new Error("Empty comment not allowed");
      }
      // Send data to api endpoint
      await api.post("/api/comments", {
        comment: this.state.text,
      });
      // Get the updated list
      const { data: comments } = await api.get("/api/comments");

      // Update state
      this.setState({ comments, error: null, text: "" });
    } catch (err) {
      this.setState({ error: err });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLogin = async e => {
    e.preventDefault();
    const { data: loginInfo } = await api.get("/api/login");
    // eslint-disable-next-line no-console
    console.log("logininfoOnpage==", loginInfo);
    this.setState({ loginInfo });
  };

  getUser = async e => {
    e.preventDefault();
    const { data: users } = await api.get("/api/users");
    this.setState({ users });
  };

  render() {
    const { comments, loading, text, error, loginInfo, users } = this.state;

    return (
      <Page {...this.props}>
        <Head>
          <title>Comments | Koa + Next.js</title>
        </Head>
        <Page.Body>
          <H1>Comments:</H1>
          <ul>
            {comments.map(comment => (
              <li key={comment["date"]}>{comment["comment"]}</li>
            ))}
          </ul>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={text} onChange={this.handleTextChange} />
            <input
              type="submit"
              value={loading ? "Loading..." : "Submit"}
              disabled={loading}
            />
          </form>
          <div>
            <H1>loginInfo:</H1>
            <form onSubmit={this.handleLogin}>
              <p>{JSON.stringify(loginInfo)}</p>
              <input type="submit" value={"login"} />
            </form>
          </div>
          <div>
            <H1>users:</H1>
            <ul>
              {map(users, user => (
                <li key={user.id}>
                  <p>
                    {user.username} {user.email}
                  </p>
                </li>
              ))}
            </ul>
            <button type="button" onClick={this.getUser}>
              get users
            </button>
          </div>
          {error && <p>Error: {error.message}</p>}
        </Page.Body>
      </Page>
    );
  }
}

export default withSSR()(InfoScreen);
