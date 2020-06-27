<?php

namespace App\interfaces;

use Illuminate\Http\Request;

interface AuthInterface
{
    /**
     * checkIfAuthenticated
     * 
     * Check if an user is authenticated or not by request
     *
     * @param Request $request
     * @return bool -> true if authenticated, false if not
     */
    public function checkIfAuthenticated(Request $request);

    /**
     * registerUser
     * 
     * Register a User By Request Form
     *
     * @param Request $request
     * @return obj $user object
     */
    public function registerUser(Request $request);

    /**
     * findUserByEmailAddress
     * 
     * Find an user by email address
     *
     * @param string $email
     * @return obj $user object
     */
    public function findUserByEmailAddress($email);
}
