module.exports = RED => {
	try {
		var ui = RED.require( 'node-red-dashboard' )( RED );
	} catch {}

	RED.nodes.registerType( 'ui_clock', function( config ) {
		RED.nodes.createNode( this, config );

		if( ui && RED.nodes.getNode( config.group ) ) {
			this.on( 'close', ui.addWidget( {
				node: this,
				format: `
					<svg version="1.1" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
						<g style="fill: var( --nr-dashboard-pageTitlebarBackgroundColor );">
							<circle cx="500" cy="25" r="25" />
							<circle cx="737.5" cy="88.638" r="25" />
							<circle cx="911.36" cy="262.5" r="25" />
							<circle cx="975" cy="500" r="25" />
							<circle cx="911.36" cy="737.5" r="25" />
							<circle cx="737.5" cy="911.36" r="25" />
							<circle cx="500" cy="975" r="25" />
							<circle cx="262.5" cy="911.36" r="25" />
							<circle cx="88.638" cy="737.5" r="25" />
							<circle cx="25" cy="500" r="25" />
							<circle cx="88.638" cy="262.5" r="25" />
							<circle cx="262.5" cy="88.638" r="25" />
						</g>
						<g style="stroke: var( --nr-dashboard-widgetTextColor );">
							<line id="ui_clock_{{ $id }}_hours" x1="500" y1="500" x2="500" y2="200" stroke-linecap="round" stroke-width="30" />
							<line id="ui_clock_{{ $id }}_minutes" x1="500" y1="500" x2="500" y2="75" stroke-linecap="round" stroke-width="20" />
						</g>
						<g style="stroke: var( --nr-dashboard-groupTextColor );">
							<line id="ui_clock_{{ $id }}_seconds" x1="500" y1="500" x2="500" y2="25" stroke-linecap="round" stroke-width="10" />
						</g>
					</svg>
				`,
				width: config.width,
				height: +config.height || RED.nodes.getNode( config.group ).config.width,
				group: config.group,
				order: config.order,
				templateScope: 'local',
				beforeEmit: msg => ( { msg } ),
				initController: $scope => $scope.$watch( 'msg', msg => {
					if( msg && typeof msg.payload === 'number' ) {
						const date = new Date( msg.payload );

						$( `#ui_clock_${ $scope.$id }_seconds` ).attr( 'transform', `rotate( ${ date.getSeconds() * 6 }, 500, 500 )` );
						$( `#ui_clock_${ $scope.$id }_minutes` ).attr( 'transform', `rotate( ${ ( date.getMinutes() + date.getSeconds() / 60 ) * 6 }, 500, 500 )` );
						$( `#ui_clock_${ $scope.$id }_hours` ).attr( 'transform', `rotate( ${ ( date.getHours() + date.getMinutes() / 60 ) * 30 }, 500, 500 )` );
					}
				} )
			} ) );
		}
	} );
};