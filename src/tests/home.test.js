import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

describe('Home page for restricted users', () => {

    beforeEach(() => {
        localStorage.setItem("currentUser", JSON.stringify({
            role: 'Restricted'
        }))
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" role="" element={
                        <Home />
                    }></Route>
                </Routes>
            </BrowserRouter>
        );
    });

    it('should render home page', async () => {
        expect(screen.getByText("Quizzes")).toBeInTheDocument();
    });

    it('should render quizzes on the page', async () => {
        await waitFor(() => {
            expect(screen.getAllByText("Play")[0]).toBeInTheDocument();
        })
    });

    it('should not render view, edit, x or add new quiz buttons', async () => {
        await waitFor(() => {
            expect(screen.getAllByText("Play")[0]).toBeInTheDocument();
        })
        expect(screen.queryByText("View")).toBeNull();
        expect(screen.queryByText("Edit")).toBeNull();
        expect(screen.queryByText("X")).toBeNull();
        expect(screen.queryByText("+ Add New Quiz")).toBeNull();
    });
});