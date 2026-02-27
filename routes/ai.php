<?php

use App\Mcp\Servers\AppServer;
use Laravel\Mcp\Server\Facades\Mcp;

Mcp::web('/mcp/app', AppServer::class);
Mcp::local('app', AppServer::class);
