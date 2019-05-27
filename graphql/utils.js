import { verify } from 'jsonwebtoken';
import schedule from 'node-schedule';
import { Auction } from '../models';
const APP_SECRET = 'GraphQL-is-aw3some';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = verify(token, APP_SECRET);
    console.log(userId);
    return userId;
  }

  throw new Error('Not authenticated');
}

async function scheduleAllAuctions() {
  const auctions = await Auction.find({ auctionFinished: false });
  auctions.forEach(async function(auction) {
    const time = new Date();
    if (auction.startTime < time && !auction.auctionStarted) {
      console.log(
        'Auction ' + auction.title + ' Was reactively set as started'
      );
      auction.auctionStarted = true;
      await auction.save();
    }

    var finish = new Date(auction.startTime);
    finish.setSeconds(finish.getSeconds() + auction.duration);
    if (finish < time) {
      console.log(
        'Auction ' + auction.title + ' Was reactively set as finished'
      );
      auction.auctionFinished = true;
      await auction.save();
    }

    if (!auction.auctionFinished) {
      scheduleJob(auction);
    }
  });
}

function scheduleJob(auction) {
  const now = new Date();
  var start = new Date(auction.startTime);
  var finish = new Date(auction.startTime);
  finish.setSeconds(start.getSeconds() + auction.duration);

  if (auction.startTime > now && !auction.auctionStarted) {
    var startAuction = schedule.scheduleJob(
      start,
      async function(tempAuction) {
        console.log(tempAuction.title + ' has started');
        tempAuction.auctionStarted = true;
        await tempAuction.save();
      }.bind(null, auction)
    );
  }

  var finishAuction = schedule.scheduleJob(
    finish,
    async function(tempAuction) {
      console.log(tempAuction.title + ' has finished');
      tempAuction.auctionFinished = true;
      await tempAuction.save();
    }.bind(null, auction)
  );

  console.log('Auction ' + auction.title + ' Was scheduled');
}

export const utils = {
  APP_SECRET,
  getUserId,
  scheduleJob,
  scheduleAllAuctions
};
